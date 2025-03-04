import { FormEvent, useEffect, useState } from "react"
import { api } from "../api/api"
import { FaRegTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

type Task = {
  id: string
  name: string
  description: string
  createdAt: Date
  finishedAt: Date | null
}

export default function MyTasks() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault()

    await api.post('/tasks', {
      name,
      description
    })

    setName("")
    setDescription("")

    await loadTasks()
  }

  async function loadTasks() {
    const response = await api.get('/tasks')

    const newTasks = response.data

    newTasks.sort((a: Task, b: Task) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    })

    setTasks(newTasks)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleDeleteTask(id: string) {
    await api.delete(`/tasks/${id}`)
    await loadTasks()
  }

  async function handleFinishTask(task: Task) {
    const isFinished = (task.finishedAt === null) ? true : false
    await api.put(`/tasks/${task.id}`, { isFinished })
    await loadTasks()
  }

  return (
    <>
      <Helmet>
        <title>Minhas Tarefas</title>
      </Helmet>

      <div className="min-h-screen w-full p-5 bg-[url('./assets/figurinha.png')] sm:bg-[length:60%] sm:bg-[position:130%_50%] bg-no-repeat flex flex-col items-center justify-center gap-10">
        <form onSubmit={handleSubmit} className="w-full pt-5 p-4 mt-5 sm:w-1/2 bg-white rounded-md border-4 shadow-2xl">
          <h1 className="text-black text-4xl text-center"> Lista de Tarefas</h1>
          <div className="flex flex-col mt-5">
            <label
              className="text-black text-base"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              className="rounded mt-1 border h-10"
              type="text"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              placeholder="Ex: Estudar React" id="name"
              required
            />
          </div>
          <div className="flex flex-col mt-5">
            <label
              className="text-black text-base"
              htmlFor="description"
            >
              Descrição
            </label>
            <textarea
              className="rounded mt-1 border h-10"
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              placeholder="Ex: Aprender React Hooks" id="description"
            />
          </div>
          <button type="submit" className="text-white text-2xl bg-blue-400 hover:bg-blue-500 w-full px-8 py-2 rounded-md mt-5">
            <span>Criar</span>
          </button>
        </form>

        <section className="flex flex-wrap gap-6 items-center justify-center w-auto m-2">
          {tasks.map(task => (
            <div
              key={task.id}
              className="relative bg-blue-400 hover:bg-blue-500 w-80 h-48 p-4 rounded-lg group transition-colors duration-300 shadow-2xl"
            >
              <strong
                className={`text-white text-xl cursor-pointer ${task.finishedAt ? 'line-through' : ''}`}
                onClick={() => handleFinishTask(task)}
              >
                {task.name}
              </strong>
              <p
                className={`text-white cursor-pointer ${task.finishedAt ? 'line-through' : ''}`}
                onClick={() => handleFinishTask(task)}
              >
                {task.description}
              </p>
              <FaRegTrashAlt
                className="size-5 absolute top-2 right-2 text-white hidden group-hover:block cursor-pointer"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
