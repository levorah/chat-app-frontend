import { User } from "../../interface";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }: { conversation: User, lastIdx: boolean, emoji: string }) => {
    console.log(conversation, 'conversation is showing in conversation component')
    const { selectedConversation, setSelectedConversation } = useConversation()
    console.log(selectedConversation, 'heheheheh')
    const isSelected = selectedConversation === conversation._id
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                    ${isSelected ? "bg-sky-500" : ""}
                `}
                onClick={() => setSelectedConversation(conversation._id)}
            >
                <div className='avatar online'>
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
            <img src="https://avatar.iran.liara.run/public/boy?username=sam" alt="" />
        </>
    );
};
export default Conversation;