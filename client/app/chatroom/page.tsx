'use client'
import MessageForm from "@/components/custom/MessageForm";
import useSocket from "@/utils/useSocket";

export default function chatroomPage() {
  const {wsInstance,messages}=useSocket()
  return (
    <div>
      <pre>{JSON.stringify(messages,null,2)}</pre>
        <MessageForm wsInstance={wsInstance}/>
    </div>
  )
}