import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"

const useLogin = () => {
    const { setAuthUser } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const login = async (username: string, password: string) => {
        setLoading(true)
        try {

            const input = handleInputErrrors(username, password)
            if (!input) return
            const res = await fetch(`/v1/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()
            console.log(data, 'data is showing')
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("accessToken", JSON.stringify(data.access_token))
            setAuthUser(data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default useLogin


const handleInputErrrors = (username: string, password: string) => {

    if (!username || !password) {
        toast.error("Please fill out the fields")
        return
    }

    if (password.length < 6) {
        toast.error("Password must be atleas 6 characters")
        return
    }

    return true
}