import { useEffect, useRef, useState } from "react";
import { createChatHub } from "../realtime/chathub.js";
import { useAuth } from "./useAuth.js";
import * as signalR from "@microsoft/signalr";

export function useChat(token, activeConversationId, onMessageArrived) {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const hubRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const hub = createChatHub(token);
    hubRef.current = hub;

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

    hub.on("MessageReceived", onMessageReceived);

    hub.start().then(async () => {
      if (activeConversationId) {
        await hub.invoke("JoinConversation", activeConversationId);
      }
    });

    hub.onreconnected(async () => {
      if (activeConversationId) {
        await hub.invoke("JoinConversation", activeConversationId);
      }
    });

    return () => {
      if (
        hubRef.current &&
        hubRef.current.state === signalR.HubConnectionState.Connected
      ) {
        hub.off("MessageReceived", onMessageReceived);
        hubRef.current.stop();
        hubRef.current = null;
      }
    };
  }, [token, activeConversationId]);

  const sendMessage = async (content) => {
    if (!hubRef.current) return;

    const clientTempId = crypto.randomUUID();

    const optimisticMessage = {
      clientTempId,
      senderId: user.id,
      content,
      pending: true,
      conversationId: activeConversationId,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    await hubRef.current.invoke("SendMessage", {
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
