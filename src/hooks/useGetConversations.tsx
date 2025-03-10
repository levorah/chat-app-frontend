import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            const access_token = localStorage.getItem("accessToken")
            if (!access_token) {
                throw new Error("Token Expired")
            }
            const token = JSON.parse(access_token)
            try {
                const res = await fetch(`/v1/api/users`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversation()
    }, [])

    return { loading, conversations }
}

export default useGetConversations