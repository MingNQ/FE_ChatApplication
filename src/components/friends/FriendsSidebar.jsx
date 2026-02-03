import { useEffect, useState } from "react";
import { FriendItem } from "./FriendItem";
import { getUserPresences } from "../../api/presenceApi";
import { useTranslation } from "react-i18next";

export function FriendsSidebar() {
  const [friends, setFriends] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getUserPresences().then((res) => {
      setFriends(res.result);
    });
  }, []);

  return (
    <aside className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold text-gray-800 mb-3">
        {t("common.friends")}
      </h3>

      <div className="space-y-2">
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </div>
    </aside>
  );
}
