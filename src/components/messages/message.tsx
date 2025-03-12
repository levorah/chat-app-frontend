import { extractTime } from "../../utils/extractTime"
import useConversation from "../../zustand/useConversation"

const Message = ({ message }: { message: any }) => {

    const { selectedConversation } = useConversation()
    const userId = localStorage.getItem("userId")
    const profilePic = localStorage.getItem("profilePic")
    const fromMe = userId === message.senderId;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePics = fromMe ? profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? "bg-gray-500" : "";
    const formattedTime = extractTime(message.createdAt)
    const shakeClass = message.shouldShake ? "shake" : ""
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={`${profilePics}`}
                        alt="Tailwind CSS chat bubble component"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2 ${shakeClass}`}>{message.message}</div>
            <div className="chat-footer text-black">{formattedTime}</div>
        </div>
    )
}

export default Message