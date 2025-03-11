import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import useAccessTokenStore from "../zustand/useAccessToken"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    // const { accessToken } = useAccessTokenStore()
    // console.log(accessToken, 'accessToken is here in get messages')
    // const token = JSON.parse(accessToken)
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const accessToken = localStorage.getItem("accessToken")
                console.log(accessToken,'access Token in getmessages')

                if (!accessToken) {
                    throw new Error("Token Expired")
                }
                const token = JSON.parse(accessToken)
                const res = await fetch(`/v1/api/messages/${selectedConversation._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log(data, 'data is showing in get message route ')
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