import { create } from "zustand";

interface AccessTokenType {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    userId: string;
    setUserId: (userId: string) => void;
    profilePic: string;
    setProfilePic: (profilePic: string) => void;
}
const useAccessTokenStore = create<AccessTokenType>((set) => ({
    accessToken: "",
    setAccessToken: (accessToken) => set({ accessToken }),
    userId: "",
    setUserId: (userId) => set({ userId }),
    profilePic: "",
    setProfilePic: (profilePic) => set({ profilePic })
}))

export default useAccessTokenStore