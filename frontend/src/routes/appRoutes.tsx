import { Routes, Route } from "react-router-dom"
import MyTasks from "../pages/MyTasks"
import NotFound from "../pages/NotFound"
import Unauthorized from "../pages/Unauthorized"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<MyTasks />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  )
}
