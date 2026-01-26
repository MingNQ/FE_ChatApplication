import { useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import * as signalR from "@microsoft/signalr";
import { SignalRContext } from "../contexts/SignalRContext.jsx";

export function useChat(activeConversationId, onMessageArrived) {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const connection = useContext(SignalRContext);

  useEffect(() => {
    if (!connection || !activeConversationId) return;

    const onMessageReceived = (message) => {
      if (message.conversationId != activeConversationId) return;

      setMessages((prev) => {
        const index = prev.findIndex(
          (m) => m.clientTempId && m.clientTempId === message.clientTempId
        );

        if (index !== -1) {
          const clone = [...prev];
          clone[index] = {
            ...message, 
            pending: false
          };
          return clone;
        }

        return [...prev, message];
      });
      
      onMessageArrived?.(message);
    };

    connection.on("MessageReceived", onMessageReceived);

    if (connection.state === signalR.HubConnectionState.Connected) {
      connection.invoke("JoinConversation", activeConversationId);
    }
    
    return () => {
      connection.off("MessageReceived", onMessageReceived);
      connection.invoke("LeaveConversation", activeConversationId);
    };
  }, [connection, activeConversationId]);

  const sendMessage = async (content) => {
    if (!connection) return;

    const clientTempId = crypto.randomUUID();

    const optimisticMessage = {
      clientTempId,
      senderId: user.id,
      content,
      pending: true,
      conversationId: activeConversationId,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    await connection.invoke("SendMessage", {
      conversationId: activeConversationId,
      content,
      senderId: user.id,
      clientTempId
    });
  };

  return {
    messages,
    setMessages,
    sendMessage,
  };
}
