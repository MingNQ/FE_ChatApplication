import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { ConversationList } from "../../../components/chat/ConversationList.jsx";
import { ChatWindow } from "../../../components/chat/ChatWindow.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { getFriends } from "../../../api/friendshipRequestApi.js";
import { getConversationByFriendId } from "../../../api/conversationApi.js";

export default function ChatPage() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    if (!activeFriend) return;
 
    const fetchMessages = async () => {
      try {
        const conversationRes = await getConversationByFriendId(
          activeFriend.id
        );
        setMessage(conversationRes.result.messages);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchMessages();
  }, [activeFriend]);

  useEffect(() => {
    if (!user) return;

    const fetchFriends = async () => {
      try {
        const friendRes = await getFriends();
        setFriends(friendRes.result);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <>
      <title>Chat</title>

      <Header />

      <div className="flex h-[calc(100vh-64px)] bg-gray-100">
        <ConversationList
          friends={friends}
          activeFriend={activeFriend}
          setActiveFriend={setActiveFriend}
        />
        <ChatWindow activeUser={activeFriend} messages={messages}/>
      </div>
    </>
  );
}
