import { useEffect, useState } from "react";
import { createChatHub } from "../realtime/chathub.js";

export function useChat(token) {
  const [messages, setMessages] = useState([]);
  const [hub, setHub] = useState(null);

  useEffect(() => {
    const hubConnection = createChatHub(token);

    hubConnection.on("MessageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    hubConnection.start().then(() => {
      setHub(hubConnection);
    });

    return () => {
      hubConnection.stop();
    };
  }, [token]);

  const joinConversation = async (conversationId) => {
    await hub.invoke("JoinConversation", conversationId);
  };

  const sendMessage = async (conversationId, content) => {
    const tempMessage = {
      id: crypto.randomUUID(),
      senderId: 13,
      content,
      pending: true,
    };

    setMessages((prev) => [...prev, tempMessage]);

    await hub.invoke("SendMessage", {
      conversationId,
      senderId: 13,
      content,
    });
  };

  return {
    messages,
    setMessages,
    joinConversation,
    sendMessage,
  };
}
