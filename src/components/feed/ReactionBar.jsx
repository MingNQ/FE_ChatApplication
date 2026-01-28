import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import { ReactionButton } from "./ReactionButton";
import { getTopReactions, REACTIONS } from "../../utils/reaction";
import { useTranslation } from "react-i18next";

export function ReactionBar({ post, myReaction, onReact, onOpenComment }) {
  const topReactions = getTopReactions(post.reactions);
  const { t } = useTranslation();

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
              ? t("feed.noComment")
              : post.comments.length + " " + t("common.comments")}
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
          label={t("common.comments")}
          onClick={onOpenComment}
        />
        <ActionButton icon={<FaShare />} label={t("common.share")} />
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
