import { useState } from "react";
import { formatTimeAgo } from "../../utils/dateTimeUtils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export function CommentItem({ post, userId, comment, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  const handleSave = async () => {
    if (!editContent.trim()) return;

    setSaving(true);
    await onEdit(post.id, comment.id, editContent);
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex gap-2">
        <Link to={`${comment.user?.id}`} className="mt-1">
          <img
            src={comment.user?.avatar ?? "images/default-avatar.jpg"}
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>

        <div
          className="
            flex flex-col max-w-[85%]
            bg-gray-100 rounded-xl px-2 pt-1 pb-2
            text-sm
            break-words
            whitespace-pre-wrap
          "
        >
          <Link
            to={`${comment.user?.id}`}
            className="font-semibold text-sm hover:underline "
          >
            {comment.user?.fullName}
          </Link>

          {!isEditing ? (
            <p className="text-sm">{comment.content}</p>
          ) : (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={2}
              className="
                w-full mt-1 text-sm
                bg-white border rounded-lg p-2
                resize-none outline-none
                focus:ring-1 focus:ring-blue-400
              "
              autoFocus
            />
          )}
        </div>
      </div>

      <div className="flex mt-1 items-center gap-4 px-11 text-xs text-gray-500">
        <span>{formatTimeAgo(new Date(comment.createdOn))}</span>

        {!isEditing && (
          <>
            <button className="hover:underline">{t("feed.reply")}</button>

            {comment.userId === userId && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="hover:underline"
                >
                  {t("common.edit")}
                </button>
                <button
                  onClick={() => onDelete(post.id, comment.id)}
                  className="hover:text-red-500"
                >
                  {t("common.delete")}
                </button>
              </>
            )}
          </>
        )}

        {isEditing && (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-blue-600 font-medium hover:underline disabled:opacity-50"
            >
              {t("common.save")}
            </button>
            <button onClick={handleCancel} className="hover:underline">
              {t("common.cancel")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
