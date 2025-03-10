import { create } from "zustand";

interface AccessTokenType {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}
const useAccessTokenStore = create<AccessTokenType>((set) => ({
    accessToken: "",
    setAccessToken: (accessToken) => set({ accessToken }),
}))

export default useAccessTokenStore