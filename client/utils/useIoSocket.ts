'use client'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

export default function useIoSocket() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [chatMessages, setChatMessages] = useState<string[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const newSocket: Socket = io('ws://localhost:4000') // Replace with your server URL

            setSocket(newSocket)

            newSocket.on('connect', () => {
                console.log('Connected to Socket.IO server')
            })

            newSocket.on('message', (data: string) => {
                // Specify message type
                console.log('Received message:', data)
                setChatMessages((prevMessages) => [...prevMessages, data])
            })

            // Cleanup function to disconnect on unmount:
            return () => {
                newSocket.disconnect()
            }
        }
    }, [])
    return { socket, chatMessages }
}
