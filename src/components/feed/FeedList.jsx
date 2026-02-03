import { useEffect, useState } from "react";
import {
  commentPost,
  deleteComment,
  getNewFeedPosts,
  getPostByUserId,
  reactPost,
  updateComment,
  updateReactPost,
} from "../../api/feedApi";
import { PostItem } from "./PostItem";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

export function FeedList({ userId }) {
  const { user } = useAuth();
  const [posts, setPost] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        const res = await getNewFeedPosts();
        setPost(res.result);
      } else {
        const res = await getPostByUserId(userId);
        setPost(res.result);
      }
    };

    fetchPosts();
  }, [user, userId]);

  const handleOnReact = async (postId, type, value) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const myReaction = post.reactions.find((r) => r.userId === user?.id);

    let res;

    if (!myReaction) {
      res = await reactPost(postId, value);
    } else {
      res = await updateReactPost(postId, value, myReaction.id);
    }

    const updatedPost = res.result;

    setPost((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
  };
  const handleOnComment = (id, value) => {
    commentPost(id, null, value).then((res) => {
      const updatedPost = res.result;

      setPost((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
    });
  };

  const handleDeleteComment = (postId, commentId) => {
    deleteComment(postId, commentId).then((res) => {
      const updatedPost = res.result;
      setPost((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
    });

    toast.info("Comment deleted successfully");
  };

  const handleEditComment = (postId, commentId, content) => {
    updateComment(postId, commentId, content).then((res) => {
      const updatedPost = res.result;
      setPost((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
    });

    toast.info("Comment updated successfully");
  };

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => {
        const myReaction = post.reactions.find((r) => r.userId === user?.id);

        return (
          <PostItem
            key={post.id}
            userId={user?.id}
            post={post}
            myReaction={myReaction}
            onReact={(id, type, value) => handleOnReact(id, type, value)}
            onComment={(id, value) => handleOnComment(id, value)}
            onDelete={(postId, commentId) =>
              handleDeleteComment(postId, commentId)
            }
            onEdit={(postId, commentId, content) => {
              handleEditComment(postId, commentId, content);
            }}
          />
        );
      })}
    </div>
  );
}
