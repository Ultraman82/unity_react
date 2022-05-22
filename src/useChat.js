import { useEffect, useRef, useState, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserInfoContextStore } from './UserInfoContext';

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = process.env.REACT_APP_WEB_SOCKET;
const useChat = (roomId, username) => {
    const [messages, setMessages] = useState([]);
    const { mcMessage, setMcMessage, myMessage, setMyMessage, } = useContext(UserInfoContextStore)

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
            secure: true
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
            let mType = message.authType
            if (mType == "mc") {
                setMcMessage(message.body)
            }
            if (mType == "mayor") {
                setMyMessage(message.body)
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            username
        });
    };

    return { messages, sendMessage };
};

export default useChat;

// const SOCKET_SERVER_URL = "https://203.250.81.122/";
