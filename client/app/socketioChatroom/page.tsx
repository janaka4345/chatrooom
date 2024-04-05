'use client'
import IoMessageForm from '@/components/custom/IoMessageForm'
import useIoSocket from '@/utils/useIoSocket'

export default function ioChatroomPage() {
    const { chatMessages, socket } = useIoSocket()
    return (
        <div>
            <pre>{JSON.stringify(chatMessages, null, 2)}</pre>
            <IoMessageForm socket={socket} />
        </div>
    )
}
