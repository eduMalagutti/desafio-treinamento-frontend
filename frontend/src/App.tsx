import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/appRoutes"
import { HelmetProvider } from "react-helmet-async"

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </BrowserRouter>
  )
}
