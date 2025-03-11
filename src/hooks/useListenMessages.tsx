import { useEffect } from "react"
import { useSocketContext } from "../context/socketContext"
import useConversation from "../zustand/useConversation"

const useListenMessages = () => {

    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessages) => {
            console.log(newMessages,'new Mesasges is showing in use listene')
            setMessages([...messages, newMessages])
        })
        return () => {
            socket?.off("newMessages")
        }
    }, [socket, messages, setMessages])
}

export default useListenMessages