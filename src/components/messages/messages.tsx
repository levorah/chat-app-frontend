import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/messageSkeleton";
import Message from "./message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages()
    useListenMessages()
    const lastMessagerRef = useRef<any>(null)
    useEffect(() => {
        setTimeout(() => {
            lastMessagerRef.current?.scrollIntoView({ behaviour: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div
                    ref={lastMessagerRef}
                    key={message._id}>
                    <Message message={message} />
                </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (<p className="text-center">Send a message to start a conversation</p>)}
        </div>
    );
};
export default Messages;