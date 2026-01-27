import { StatItem } from "./StatItem";
import { FaPen, FaStar, FaUserFriends } from "react-icons/fa";

export function ProfileStats({ user }) {
  return (
    <div className="bg-white mt-2 rounded-xl shadow p-4 grid grid-cols-3 gap-2 text-center">
      <StatItem
        icon={<FaUserFriends />}
        label="Friends"
        value={user?.friends}
      />
      <StatItem icon={<FaStar />} label="Follower" value={user?.followers} />
      <StatItem icon={<FaPen />} label="Posts" value={user?.posts} />
    </div>
  );
}
