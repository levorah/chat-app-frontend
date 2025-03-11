import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations()
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.length > 0 ? (
                conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))
            ) : (
                !loading && <p className="text-center">No conversations found.</p>
            )}
            {loading && <span className="loading loading-spinner mx-auto"></span>}
        </div>
    );
};
export default Conversations;