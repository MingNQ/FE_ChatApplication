export function ReactionBar({ post }) {
  return (
    <div className="flex justify-between border-t px-4 py-2 text-sm">
      <button>{post.likeCount} Like</button>
      <button>{post.commentCount} Comment</button>
      <button>Share</button>
    </div>
  );
}
