import React, { createContext, ReactNode, useContext, useState } from "react";



type AuthContextType = {
    authUser: string | null;
    setAuthUser: React.Dispatch<React.SetStateAction<string | null>>;
}
type AuthProps = {
    children: ReactNode
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: AuthProps) => {
    const storedUser = localStorage.getItem("chat-user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    const [authUser, setAuthUser] = useState<string | null>(parsedUser)
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}