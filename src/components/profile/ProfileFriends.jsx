import { useNavigate } from "react-router";

export function ProfileFriends({ friends, variant = "grid" }) {
  const gridClass =
    variant === "compact"
      ? "grid-cols-4 sm:grid-cols-3 gap-2"
      : "grid-cols-6 sm:grid-cols-4 lg:grid-cols-6 gap-4";

  const textSize = variant === "compact" ? "text-sm" : "text-lg";
  const navigate = useNavigate();

  return (
    <div className={`grid ${gridClass}`}>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="cursor-pointer"
          onClick={() => {
            navigate(`/${friend.id}`);
          }}
        >
          <img
            src={friend.avatar || "/images/default-avatar.jpg"}
            className="aspect-square object-cover rounded-lg"
          />
          <p className={`${textSize} mt-1 truncate`}>{friend.fullName}</p>
        </div>
      ))}
    </div>
  );
}
