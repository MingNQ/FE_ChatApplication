import { formatTimeAgo } from "../../utils/dateTimeUtils";

export function CommentItem({ comment }) {
  return (
    <div>
      <div className="flex gap-3">
        <img
          src={comment.user?.avatar}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div
          className=" 
            flex flex-col max-w-[85%]
            bg-gray-100 rounded-xl px-3 py-2
            text-sm
            break-words
            whitespace-pre-wrap"
        >
          <div className="font-semibold text-sm">{comment.user?.fullName}</div>

          <p className="text-sm">{comment.content}</p>
        </div>
      </div>
      <div className="flex mt-1 justify-start items-center gap-4 px-11 text-gray-500">
        <div className="text-xs text-gray-500">
          {formatTimeAgo(new Date(comment.createdOn))}
        </div>
        <button className="text-xs text-gray-700 hover:text-gray-900">Reply</button>
        <button className="text-xs text-gray-600 hover:text-red-500">Delete</button>
      </div>
    </div>
  );
}
