import { CommentPreview } from "./CommentPreview";
import { PostContent } from "./PostContent";
import { PostHeader } from "./PostHeader";
import { PostMedia } from "./PostMedia";
import { ReactionBar } from "./ReactionBar";

export function PostItem({ post }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <PostHeader post={post} />
      <PostContent content={post.content} />
      <PostMedia media={post.media} />
      <ReactionBar post={post} />
      <CommentPreview postId={post.postId} />
    </div>
  );
}
