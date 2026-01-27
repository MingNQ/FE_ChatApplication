import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import { ReactionButton } from "./ReactionButton";
import { getTopReactions, REACTIONS } from "../../utils/reaction";

export function ReactionBar({ post, myReaction, onReact, onOpenComment }) {
  const topReactions = getTopReactions(post.reactions);
  return (
    <div>
      {(post.reactions.length > 0 || post.comments.length > 0) && (
        <div className="flex justify-between px-4 pt-2 text-sm text-gray-600">
          <div className="flex items-center">
            {topReactions.map((value, i) => (
              <span key={i} className="text-lg -mr-2">
                {REACTIONS.find((r) => r.value == value).emoji}
              </span>
            ))}
            <span className="ml-3 text-black">{post.reactions.length}</span>
          </div>

          <span
            className="hover:text-gray-500 hover:underline cursor-pointer"
            onClick={onOpenComment}
          >
            {post.comments.length == 0
              ? "No comment"
              : post.comments.length + " comments"}
          </span>
        </div>
      )}

      <div className="flex px-2 py-1 text-sm text-gray-600">
        <ReactionButton
          myReaction={myReaction}
          onReact={(type, value) => onReact(post.id, type, value)}
        />

        <ActionButton
          icon={<FaRegCommentAlt />}
          label="Comment"
          onClick={onOpenComment}
        />
        <ActionButton icon={<FaShare />} label="Share" />
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100"
    >
      {icon}
      {label}
    </button>
  );
}
