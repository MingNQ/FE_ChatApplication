export function MessageRow({ me, children, showAvatar, avatarUrl }) {
  return (
    <div
      className={`flex items-end gap-2 ${me ? "justify-end" : "justify-start"}`}
    >
      {!me && (
        <div className="w-8">
          {showAvatar ? (
            <img
              src="/images/default-avatar.jpg"
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      )}

      {children}
    </div>
  );
}
