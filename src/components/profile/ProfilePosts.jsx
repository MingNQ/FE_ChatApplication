import FeedComposer from "../feed/FeedComposer";
import { FeedList } from "../feed/FeedList";

export function ProfilePosts({ userId, isMe }) {
  return (
    <div className="space-y-4">
      {isMe && <FeedComposer />}

      <FeedList userId={userId}/>
    </div>
  );
}
