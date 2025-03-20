import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        console.log('Setting socket context');

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            console.log('Socket disconnecting');
            newSocket.disconnect();
        };
    }, []);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export default function useSocket()  { 
    console.log('Using socket context');
    return useContext(socketContext); 
};