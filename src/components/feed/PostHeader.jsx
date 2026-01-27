import { FaGlobeAsia, FaLock, FaUserFriends } from "react-icons/fa";
import { formatTimeAgo } from "../../utils/dateTimeUtils";

export function PostHeader({ post }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <img
        src={post.author?.avatar ?? "images/default-avatar.jpg"}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-semibold">{post.author?.fullName}</div>
        <div className="flex gap-1 text-xs text-gray-500">
          {post.visibility == 2 ? (
            <FaGlobeAsia />
          ) : post.visibility != 1 ? (
            <FaUserFriends />
          ) : (
            <FaLock />
          )}{" "}
          • {formatTimeAgo(new Date(post.createdOn))}
        </div>
      </div>
    </div>
  );
}
