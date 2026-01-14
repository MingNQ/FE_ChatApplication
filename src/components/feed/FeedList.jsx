import { useEffect, useState } from "react";
import { getPost } from "../../api/feedApi";
import { PostItem } from "./PostItem";

export function FeedList() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const res = await getPost();
        console.log(res.result.data);
        setPost(res.result.data);
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
