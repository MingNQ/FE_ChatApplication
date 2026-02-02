import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { ConversationItem } from "./ConversationItem";

export function ConversationList({
  conversations,
  activeFriend,
  setActiveFriend,
  setCurrentConversation,
}) {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="w-80 bg-white flex flex-col mt-16">
      <div className="p-4 font-semibold text-lg">{t("common.chats")}</div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            {t("chat.noAnyConversationYet")}
          </div>
        )}

        {conversations.map((conversation) => {
          const members = conversation.members.filter(
            (m) => m.userId != user.id,
          );

          return (
            <ConversationItem
              key={conversation.id}
              name={
                members.length > 2
                  ? conversation.name
                  : members[0].user.fullName
              }
              lastMessage={
                conversation.lastMessageContentKey == ""
                  ? conversation.lastMessageContent
                  : t(conversation.lastMessageContentKey)
              }
              active={members[0].userId === activeFriend?.id}
              onClick={() => {
                setActiveFriend(members[0].user);
                setCurrentConversation(conversation);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
