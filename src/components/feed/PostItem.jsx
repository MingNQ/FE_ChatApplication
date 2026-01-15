import { useState } from "react";
import { CommentModal } from "./CommentModal";
import { PostContent } from "./PostContent";
import { PostHeader } from "./PostHeader";
import { PostMedia } from "./PostMedia";
import { ReactionBar } from "./ReactionBar";

export function PostItem({ post, myReaction, onReact, onComment }) {
  const [openComments, setOpenComments] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow">
      <PostHeader post={post} />
      <PostContent content={post.content} />
      <PostMedia media={post.media} />
      <ReactionBar
        post={post}
        myReaction={myReaction}
        onReact={onReact}
        onOpenComment={() => setOpenComments(true)}
      />

      {openComments && (
        <CommentModal
          post={post}
          myReaction={myReaction}
          onReact={onReact}
          onClose={() => setOpenComments(false)}
          onSubmit={onComment}
        />
      )}
    </div>
  );
}
