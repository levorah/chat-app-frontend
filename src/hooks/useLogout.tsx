import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"

const useLogout = () => {
    const { setToken } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const logout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL!}`)
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem("accessToken")
            setToken(null)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout