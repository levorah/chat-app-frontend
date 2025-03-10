import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations()
    console.log(conversations,'heheh')
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
        </div>
    );
};
export default Conversations;