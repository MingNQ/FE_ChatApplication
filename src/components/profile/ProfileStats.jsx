import { useTranslation } from "react-i18next";
import { StatItem } from "./StatItem";
import { FaPen, FaStar, FaUserFriends } from "react-icons/fa";

export function ProfileStats({ user }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white mt-2 rounded-xl shadow p-4 grid grid-cols-3 gap-2 text-center">
      <StatItem
        icon={<FaUserFriends />}
        label={t("common.friends")}
        value={user?.friends}
      />
      <StatItem
        icon={<FaStar />}
        label={t("common.followers")}
        value={user?.followers}
      />
      <StatItem
        icon={<FaPen />}
        label={t("common.posts")}
        value={user?.posts}
      />
    </div>
  );
}
