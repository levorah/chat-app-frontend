import { useEffect } from "react"
import { useSocketContext } from "../context/socketContext"
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {

    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessages) => {
            newMessages.shouldShake = true;
            const sound = new Audio(notificationSound)
            sound.volume = 0.3 
            sound.play()
            setMessages([...messages, newMessages])
        })
        return () => {
            socket?.off("newMessages")
        }
    }, [socket, messages, setMessages])
}

export default useListenMessages