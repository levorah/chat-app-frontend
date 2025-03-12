import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    // const { accessToken } = useAccessTokenStore()
    // const token = JSON.parse(accessToken)
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const accessToken = localStorage.getItem("accessToken")

                if (!accessToken) {
                    throw new Error("Token Expired")
                }
                const token = JSON.parse(accessToken)
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL!}/${selectedConversation._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation._id) getMessages()

    }, [selectedConversation._id, setMessages])
    return { messages, loading }
}

export default useGetMessages