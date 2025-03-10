import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import SignUp from "./pages/signup/signup"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/authContext"

function App() {
  const { authToken } = useAuthContext()
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authToken ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authToken ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={authToken ? <Navigate to={"/"} /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
