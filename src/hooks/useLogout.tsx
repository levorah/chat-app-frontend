import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"

const useLogout = () => {
    const { setToken } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const logout = async () => {
        try {
            const res = await fetch(`/v1/api/auth/logout`)
            const data = await res.json()
            console.log(data, '===============>> data')
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