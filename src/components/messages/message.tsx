import useConversation from "../../zustand/useConversation"

const Message = ({ message }: { message: any }) => {
    console.log(message.message, 'message is here')
    console.log(message, 'message is here from props message')

    const { selectedConversation } = useConversation()
    const userId = localStorage.getItem("userId")
    const profilePic = localStorage.getItem("profilePic")
    const fromMe = userId === message.senderId;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePics = fromMe ? profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? "bg-gray-500" : "";
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
            <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
            <div className="chat-footer text-white bg-blue-500">12.23</div>
        </div>
    )
}

export default Message