import { useAuth } from "../../hooks/useAuth";
import { ConversationItem } from "./ConversationItem";

export function ConversationList({
  conversations,
  activeFriend,
  setActiveFriend,
}) {
  const { user } = useAuth();

  return (
    <div className="w-80 bg-white flex flex-col mt-16">
      <div className="p-4 font-semibold text-lg">Chats</div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No any conversation yet.
          </div>
        )}

        {conversations.map((conversation) => {
          const members = conversation.members.filter(
            (m) => m.userId != user.id
          );

          return (
            <ConversationItem
              key={conversation.id}
              name={
                members.length > 2
                  ? conversation.name
                  : members[0].user.fullName
              }
              lastMessage={conversation.lastMessageContent}
              active={members[0].userId === activeFriend?.id}
              onClick={() => setActiveFriend(members[0].user)}
            />
          );
        })}
      </div>
    </div>
  );
}
