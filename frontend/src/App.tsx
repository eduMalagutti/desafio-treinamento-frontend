import { FormEvent, useEffect, useState } from "react"
import { api } from "./api"

type Task = {
  id: string
  name: string
  description: string
}

function App() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault()

    await api.post('/tasks', {
      name,
      description
    })

    await loadTasks()
  }

  async function loadTasks() {
    const response = await api.get('/tasks')
    setTasks(response.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="h-screen w-full bg-purple-500">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col">
          <label className="text-white text-lg" htmlFor="name">Nome</label>
          <input type="text" value={name} onChange={(evt) => setName(evt.target.value)} placeholder="Ex: Estudar React" id="name" />
        </div>
        <div className="flex flex-col">
          <label className="text-white text-lg" htmlFor="description">Descrição</label>
          <input type="text" value={description} onChange={(evt) => setDescription(evt.target.value)} placeholder="Ex: Aprender React Hooks" id="description" />
        </div>
        <button type="submit" className="bg-white w-fit px-8 py-2 rounded-lg">
          <span>Criar</span>
        </button>
        <div>
        {tasks.map(task => (
          <div key={task.id} className="mt-4">
            <strong className="text-white">{task.name}</strong>
            <p className="text-white">{task.description}</p>
          </div>
        ))}
      </div>
      </form>
    </div>
  )
}

export default App
