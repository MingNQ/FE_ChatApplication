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

  const scrollModeRef = useRef("idle");
  const isAtBottomRef = useRef(true);
  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    if (!activeFriend) return;

    scrollModeRef.current = "reset";
    prevMessageCountRef.current = 0;
  }, [activeFriend?.id]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const currCount = messages.length;

    if (scrollModeRef.current === "reset") {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    } else if (scrollModeRef.current === "append" && isAtBottomRef.current) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }

    scrollModeRef.current = "idle";
    prevMessageCountRef.current = currCount;
  }, [messages]);

  useEffect(() => {
    if (
      messages.length > prevMessageCountRef.current &&
      scrollModeRef.current !== "prepend"
    ) {
      scrollModeRef.current = "append";
    }
  }, [messages.length]);

  const handleScroll = async () => {
    const el = containerRef.current;
    if (!el) return;

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    isAtBottomRef.current = nearBottom;

    if (el.scrollTop <= 0 && hasMore && !loadingOld) {
      scrollModeRef.current = "prepend";
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
          <div className="sticky top-0 z-10 text-center py-1 text-xs text-gray-400 bg-gray-100">
            Loading older messages...
          </div>
        )}

        {messages.map((message, index) => {
          const prev = messages[index - 1];
          const next = messages[index + 1];
          const isLastInGroup = !next || next.senderId !== message.senderId;
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
                  showAvatar={isLastInGroup}
                  avatarUrl={
                    activeFriend.id !== message.senderId
                      ? activeFriend.avatarUrl
                      : null
                  }
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
