export function ConversationItem({
  name,
  lastMessage,
  active,
  ownMessage,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer
        hover:bg-gray-100
        ${active ? "bg-blue-50" : ""}`}
    >
      <div className="w-10 h-10 text-white flex items-center justify-center cursor-pointer">
        <img
          src="images/default-avatar.jpg"
          className="rounded-full hover:scale-105 transition"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-sm text-gray-500 truncate">
          {ownMessage ? "You: " + lastMessage : lastMessage}
        </div>
      </div>
    </div>
  );
}
