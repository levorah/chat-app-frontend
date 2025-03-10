import { create } from "zustand";
import { User } from "../interface";

interface ConversationState {
    selectedConversation: User;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: any[];
    setMessages: (messages: any[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: {
        fullname: "",
        username: "",
        _id: "",
        gender: "",
        profilePic: ""
    },
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),


}))

export default useConversation