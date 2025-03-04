import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();


  return (
    <>
      <Helmet>
        <title>Not Found 404</title>
      </Helmet>

      <div className="min-h-screen flex flex-col gap-4 w-screen justify-center items-center">
        <h1>Rota nao encontrada 404</h1>

        <button type="button" onClick={() => navigate(-1)} className="p-1 border-2 rounded-md bg-blue-500 text-white">
          Voltar
        </button>
      </div>

    </>
  )
}
