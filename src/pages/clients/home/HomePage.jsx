import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { UserCard } from "../../../components/users/UserCard";
import {
  acceptFriendRequest,
  addFriend,
  getFriendRequest,
  getFriends,
  getReceivedFriendRequest,
  getRelatedFriends,
  rejectFriendRequest,
} from "../../../api/friendshipRequestApi";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";

export function HomePage() {
  const currentUser = useAuth();
  const { toast } = useToast();

  const [requested, setRequested] = useState([]);
  const [received, setReceived] = useState([]);
  const [userSend, setUserSend] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser || !currentUser.user) return;

    const fetchAll = async () => {
      try {
        const [usersRes, sentRes, receivedIds, friendsRes] = await Promise.all([
          getRelatedFriends(),
          getFriendRequest(),
          getReceivedFriendRequest(),
          getFriends()
        ]);

        setData(usersRes.result);
        setRequested(sentRes.result);
        setUserSend(receivedIds.result);
        setReceived(receivedIds.result.map((fr) => fr.userId));
        setFriends(friendsRes.result);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [currentUser]);

  const handleAddFriend = async (userId) => {
    try {
      const res = await addFriend(userId);
      setRequested((prev) => [...prev, res.result.friendId]);
    } catch (error) {
      console.log("Add friend request failed", error);
    }
  };

  const handleAcceptFriend = async (userId) => {

    const res = await acceptFriendRequest(userId);
    toast.info(`Accept friend request from ${res.result.friend.fullName}`);

    setFriends((prev) => [...prev, res.result.user]);
    setUserSend((prev) => prev.filter(r => r.id != userId));
  };

  const handleRejectFriend = async (userId) => {
    const res = await rejectFriendRequest(userId);
    toast.info(`Reject friend request from ${res.result.friend.fullName}`);
    setUserSend((prev) => prev.filter(r => r.id != userId));
  };

  return (
    <>
      <title>Home</title>
      <Header />

      <main className="pt-20 px-6 max-w-6xl mx-auto">
        <section className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            People you may know
          </h1>

          {loading && <p className="text-gray-500">Loading users...</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isRequested={requested.includes(user.id)}
                onAddFriend={() => handleAddFriend(user.id)}
              />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Friend Requests
          </h1>

          {loading && <p className="text-gray-500">Loading users...</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userSend?.map((u) => (
              <UserCard
                key={u.user.id}
                user={u.user}
                isReceived={received}
                onAccept={() => handleAcceptFriend(u.id)}
                onReject={() => handleRejectFriend(u.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h1 className="text-2xl font-semibold mb-6">Friends</h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map((friend) => (
              <UserCard key={friend.id} user={friend} isFriend={true}/>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
