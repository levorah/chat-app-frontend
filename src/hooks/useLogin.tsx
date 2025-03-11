import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"
import useAccessTokenStore from "../zustand/useAccessToken"

const useLogin = () => {
    const { setToken } = useAuthContext()
    const { setAccessToken, setUserId, setProfilePic } = useAccessTokenStore()
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
            let accessToken = JSON.stringify(data.access_token);
            localStorage.setItem("accessToken", accessToken);
            setToken(data);
            localStorage.setItem("userData", data)
            setUserId(data?.userId)
            localStorage.setItem("userId", data?.userId)
            localStorage.setItem("profilePic", data?.profilePic)
            setProfilePic(data?.profilePic)
            console.log(accessToken, 'in the login page accsstoekn')
            setAccessToken(accessToken);

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