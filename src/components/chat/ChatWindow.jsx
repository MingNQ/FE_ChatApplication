import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { MessageRow } from "./MessageRow";
import { DateDivider } from "../DateDivider";
import {
  shouldShowDateDivider,
  shouldShowTimeDivider,
} from "../../utils/dateTimeUtils";

export function ChatWindow({
  activeFriend,
  messages,
  onSend,
  loadingOld,
  hasMore,
  loadOlderMessages,
}) {
  const containerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isNewMessage = messages.length > prevMessageCountRef.current;

    if (isNewMessage && shouldAutoScrollRef.current) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }

    prevMessageCountRef.current = messages.length;
  }, [messages]);

  const handleScroll = async () => {
    const el = containerRef.current;
    if (!el || loadingOld || !hasMore) return;

    if (el.scrollTop < 50) {
      await loadOlderMessages(containerRef);
    }
  };

  if (!activeFriend) return;

  return (
    <div className="flex-1 flex flex-col mt-15">
      <ChatHeader user={activeFriend} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-1"
      >
        {loadingOld && (
          <div className="text-center text-xs text-gray-400">Loading...</div>
        )}

        {messages.map((message, index) => {
          const prev = messages[index - 1];
          const showDate = shouldShowDateDivider(message, prev);
          const showTime = shouldShowTimeDivider(message, prev);
          const showDivider = showDate || showTime;

          return (
            <div key={index}>
              {showDivider && (
                <DateDivider date={message.sentAt} showDate={showDate} />
              )}

              {message.content && (
                <MessageRow
                  key={message.id ?? message.clientTempId}
                  me={activeFriend.id !== message.senderId}
                >
                  <MessageBubble
                    text={message.content}
                    me={activeFriend.id != message.senderId}
                  />
                </MessageRow>
              )}

              {message.attachments?.length > 0 && (
                <MessageRow me={activeFriend.id !== message.senderId}>
                  <div className="grid gap-2 mt-3">
                    {message.attachments.map((item) => {
                      const file = item.fileStorage ?? item;

                      return (
                        <div
                          key={item.id}
                          className="relative rounded-lg overflow-hidden"
                        >
                          {file.type.startsWith("image") ? (
                            <img
                              src={file.fullPathUrl}
                              className="w-full max-w-80 h-full object-cover"
                              alt=""
                            />
                          ) : (
                            <video
                              src={file.fullPathUrl}
                              controls
                              className="w-full max-w-80 h-full object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </MessageRow>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
