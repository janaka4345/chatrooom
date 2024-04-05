'use client'
import { useEffect, useState } from "react";

export default function useSocket() {
    const [wsInstance, setWsInstance] = useState<WebSocket|null>(null);
  const [messages, setMessages] = useState<String[]>([]);


    useEffect(() => {
        // Check if browser environment (prevents server-side errors)
        if (typeof window !== 'undefined') {
          const url = 'ws://localhost:4000/'; // Replace with your URL
          const ws = new WebSocket(url);
    
          ws.onopen = () => {
            console.log('WebSocket connection opened');
            setWsInstance(ws); // Store the instance for sending messages
          };
    
          ws.onmessage = (event) => {
            const message = JSON.parse(event.data); // Assuming JSON messages
            setMessages((prevMessages) => [...prevMessages, message]);
          };
    
          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
          };
    
          // Cleanup function to close connection on unmount
          return () => ws.close();
        }
      }, []);
      return {wsInstance,messages}
}