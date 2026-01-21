import { StatItem } from "./StatItem";

export function ProfileStats({ user }) {
  return (
    <div className="bg-white mt-2 rounded-xl shadow p-4 grid grid-cols-3 gap-2 text-center">
      <StatItem icon="👥" label="Friends" value={user?.friends} />
      <StatItem icon="⭐" label="Follower" value={user?.followers} />
      <StatItem icon="✍️" label="Posts" value={user?.posts} />
    </div>
  );
}
