import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { ConversationList } from "../../../components/chat/ConversationList.jsx";
import { ChatWindow } from "../../../components/chat/ChatWindow.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { getConversationByFriendId, getConversations } from "../../../api/conversationApi.js";
import { useChat } from "../../../hooks/useChat.js";

export default function ChatPage() {
  const { user } = useAuth();
  const [recentConversations, setRecentConversation] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(0);
  
  const token = localStorage.getItem("token");
  const { messages, setMessages, sendMessage } = useChat(token, activeConversationId);

  useEffect(() => {
    if (!activeFriend) return;
 
    const fetchMessages = async () => {
      try {
        const conversationRes = await getConversationByFriendId(
          activeFriend.id
        );
        setActiveConversationId(conversationRes.result.id);
        setMessages(conversationRes.result.messages);
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

  return (
    <>
      <title>Chat</title>

      <Header />

      <div className="flex h-[calc(100vh-64px)] bg-gray-100">
        <ConversationList
          conversations={recentConversations}
          activeFriend={activeFriend}
          setActiveFriend={setActiveFriend}
        />
        <ChatWindow activeUser={activeFriend} messages={messages} onSend={sendMessage}/>
      </div>
    </>
  );
}
