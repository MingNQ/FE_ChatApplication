import { FaTimes } from "react-icons/fa";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { CommentList } from "./CommentList";
import { CommentInput } from "./CommentInput";
import { ReactionBar } from "./ReactionBar";

export function CommentModal({
  post,
  userId,
  myReaction,
  onClose,
  onSubmit,
  onReact,
  onDelete,
  onEdit,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-200">
          <span className="font-semibold">Post's {post.author?.fullName}</span>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <PostHeader post={post} />
          <PostContent content={post.content} />
          <ReactionBar post={post} myReaction={myReaction} onReact={onReact} />
          <CommentList
            post={post}
            userId={userId}
            comments={post.comments}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>

        <div className="px-4 py-3">
          <CommentInput post={post} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
