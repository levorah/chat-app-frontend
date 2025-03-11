import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

type SocketProps = {
    children: ReactNode
}
type SocketType = Socket<DefaultEventsMap, DefaultEventsMap> | null
type SocketContextType = {
    socket: SocketType | null,
    onlineUsers: string[],
}
const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error("Socket Context Within a Socket provider")
    return context
}

export const SocketContextProvider = ({ children }: SocketProps) => {
    const [socket, setSocket] = useState<SocketType>(null)
    const { authToken } = useAuthContext()
    const [onlineUsers, setOnlineUsers] = useState([])
    const userId = localStorage.getItem("userId")
    console.log(userId, 'user from localStorage in socket context')
    useEffect(() => {
        if (authToken) {
            const socket = io(`http://localhost:3001`, {
                query: {
                    userId: userId
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                console.log(users, 'users are hear')
                setOnlineUsers(users)
            })
            return () => {
                socket.close();
            }
        } else {
            console.log("inside socket context else statement")
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authToken])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}