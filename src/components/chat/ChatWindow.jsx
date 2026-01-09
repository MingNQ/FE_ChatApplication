import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { MessageRow } from "./MessageRow";

export function ChatWindow({ activeUser, messages }) {
  if (!activeUser) return;

  return (
    <div className="flex-1 flex flex-col mt-15">
      <ChatHeader name={activeUser.fullName} online={true} />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {messages?.map((message) => (
          <MessageRow key={message.id} me={activeUser.id != message.senderId}>
            <MessageBubble text={message.content} me={activeUser.id != message.senderId}/>
          </MessageRow>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
