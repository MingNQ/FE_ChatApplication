import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { MessageRow } from "./MessageRow";

export function ChatWindow({ activeUser, messages, onSend }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    setAutoScroll(nearBottom);
  };

  if (!activeUser) return;

  return (
    <div className="flex-1 flex flex-col mt-15">
      <ChatHeader name={activeUser.fullName} online={true} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
      >
        {messages?.map((message) => (
          <MessageRow
            key={message.id ?? message.clientTempId}
            me={activeUser.id != message.senderId}
          >
            <MessageBubble
              text={message.content}
              me={activeUser.id != message.senderId}
            />
          </MessageRow>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
