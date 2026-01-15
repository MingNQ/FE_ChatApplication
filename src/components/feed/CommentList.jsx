import { CommentItem } from "./CommentItem";

export function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 text-sm border-t border-t-gray-200">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-2 border-t border-t-gray-200">
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
