import { useSocketContext } from "../../context/socketContext";
import { User } from "../../interface";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }: { conversation: User, lastIdx: boolean, emoji: string }) => {

    const { selectedConversation, setSelectedConversation } = useConversation()
    const { onlineUsers } = useSocketContext()
    const isSelected = selectedConversation?._id === conversation._id
    const isOnline = onlineUsers.includes(conversation._id)
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                    ${isSelected ? "bg-sky-500" : ""}
                `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
                    <div className='w-12 rounded-full'>
                        <img
                            src={conversation.profilePic}
                            alt='user avatar'
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};
export default Conversation;