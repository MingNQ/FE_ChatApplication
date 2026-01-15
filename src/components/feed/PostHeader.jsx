import { formatTimeAgo } from "../../utils/dateTimeUtils";

export function PostHeader({ post }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <img src={post.author?.avatar} className="w-10 h-10 rounded-full" />
      <div>
        <div className="font-semibold">{post.author?.fullName}</div>
        <div className="text-xs text-gray-500">
          {formatTimeAgo(new Date(post.createdOn))}
        </div>
      </div>
    </div>
  );
}
