import { useEffect } from "react";
import { useChat } from "../../../hooks/useChat.js";
import { getMessages } from "../../../api/conversationApi.js";

export default function ChatPage({ token, conversationId }) {
  const { messages, setMessages, joinConversation, sendMessage } = useChat(token);

  useEffect(() => {
    joinConversation(conversationId);

    getMessages(conversationId).then((result) => {
      setMessages(result);
    });
  }, [conversationId]);
  return (
    <>
      <title>Chat</title>

      <div>
        <h2>Conversation {conversationId}</h2>

        <ul>
          {messages.map((m, i) => (
            <li key={i}>
              <b>{m.senderId}</b>: {m.content}
            </li>
          ))}
        </ul>

        <input
          placeholder="Type message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(conversationId, e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </>
  );
}
