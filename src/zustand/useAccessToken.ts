import { create } from "zustand";

interface AccessTokenType {
    accessToken: string;
    setAcessToken: (accessToken: string) => void;
}
const useAccessTokenStore = create<AccessTokenType>((set) => ({
    accessToken: "",
    setAcessToken: (accessToken: string) => set({ accessToken }),
}))

export default useAccessTokenStore