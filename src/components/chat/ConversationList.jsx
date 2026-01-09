import { ConversationItem } from "./ConversationItem";

export function ConversationList({ friends, activeFriend, setActiveFriend }) {
  return (
    <div className="w-80 bg-white flex flex-col mt-16">
      <div className="p-4 font-semibold text-lg">Chats</div>

      <div className="flex-1 overflow-y-auto">
        {friends.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No any conversation yet.
          </div>
        )}

        {friends.map((friend) => (
          <ConversationItem
            key={friend.id}
            name={friend.fullName}
            lastMessage="Ok nhé"
            active={friend.id === activeFriend?.id}
            onClick={() => setActiveFriend(friend)}
          />
        ))}
      </div>
    </div>
  );
}
