import useGetMessages from "../../hooks/useGetMessages";
import Message from "./message";

const Messages = () => {
    const { messages, loading } = useGetMessages()
    console.log(messages,'message is showing')
    return (
        <div className='px-4 flex-1 overflow-auto'>
            
        </div>
    );
};
export default Messages;