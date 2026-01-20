import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { ConversationList } from "../../../components/chat/ConversationList.jsx";
import { ChatWindow } from "../../../components/chat/ChatWindow.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { getConversations, getMessages } from "../../../api/conversationApi.js";
import { useChat } from "../../../hooks/useChat.js";

export default function ChatPage() {
  const { user } = useAuth();
  const [recentConversations, setRecentConversation] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOld, setLoadingOld] = useState(false);

  const token = localStorage.getItem("token");

  const handleMessageArrived = (message) => {
    setRecentConversation((prev) => {
      const index = prev.findIndex((c) => c.id === message.conversationId);

      if (index === -1) return prev;

      const updated = {
        ...prev[index],
        lastMessageContent: message.content,
        lastMessageSentAt: message.sentAt,
        unreadCount:
          message.senderId !== user.id
            ? prev[index].unreadCount + 1
            : prev[index].unreadCount,
      };

      return [updated, ...prev.filter((_, i) => i !== index)];
    });
  };

  const { messages, setMessages, sendMessage } = useChat(
    token,
    activeConversationId,
    handleMessageArrived,
  );
  useEffect(() => {
    if (!activeFriend) return;

    const fetchMessages = async () => {
      try {
        const response = await getMessages(currentConversation.id);

        setActiveConversationId(response.result.id);
        setMessages(response.result.messages.reverse());
        setCursor(response.result.nextCursor);
        setHasMore(response.result.hasMore);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchMessages();
  }, [activeFriend]);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      try {
        const conversationRes = await getConversations();
        setRecentConversation(conversationRes.result);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchConversations();
  }, [user]);

  const loadOlderMessages = async (containerRef) => {
    setLoadingOld(true);

    const el = containerRef.current;
    const prevHeight = el.scrollHeight;

    const response = await getMessages(activeConversationId, cursor);

    setMessages((prev) => [...response.result.messages.reverse(), ...prev]);
    setCursor(response.result.nextCursor);
    setHasMore(response.result.hasMore);

    requestAnimationFrame(() => {
      const newHeight = el.scrollHeight;
      el.scrollTop = newHeight - prevHeight;
    });

    setLoadingOld(false);
  };

  return (
    <>
      <title>Chat</title>

      <Header />

      <div className="flex h-[calc(100vh-64px)] bg-gray-100">
        <ConversationList
          conversations={recentConversations}
          activeFriend={activeFriend}
          setActiveFriend={setActiveFriend}
          setCurrentConversation={setCurrentConversation}
        />
        <ChatWindow
          activeFriend={activeFriend}
          messages={messages}
          onSend={sendMessage}
          loadingOld={loadingOld}
          hasMore={hasMore}
          loadOlderMessages={(containerRef) => loadOlderMessages(containerRef)}
        />
      </div>
    </>
  );
}
