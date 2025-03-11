import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import useAccessTokenStore from "../zustand/useAccessToken"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)

    // const { accessToken } = useAccessTokenStore()
    // console.log(accessToken, 'accsssToekn in useSendMessage')
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message: string) => {
        setLoading(true)

        try {
            const accessToken = localStorage.getItem("accessToken")
            if (!accessToken) throw new Error("Token Expired")
            const token = JSON.parse(accessToken)
            const res = await fetch(`/v1/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }

}

export default useSendMessage