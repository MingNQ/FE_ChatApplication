import { useTranslation } from "react-i18next";
import { FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router";

export function FriendItem({ friend }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <Link to={`/${friend.id}`} className="relative hover:scale-105">
        <img
          src="images/default-avatar.jpg"
          className="w-10 h-10 rounded-full bg-gray-300"
        />

        <span
          className={`absolute bottom-0 right-0 w-3 h-3 
            ${friend.presence.status == 1 ? "bg-green-500 rounded-full border-2 border-white" : ""}
          `}
        />
      </Link>

      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{friend.fullName}</p>
        <p className="text-xs text-gray-500">
          {friend.presence.status == 1
            ? t("common.online")
            : t("common.offline")}
        </p>
      </div>

      <Link to={"/chat"}>
        <FaFacebookMessenger className="text-2xl text-gray-500 hover:text-gray-600" />
      </Link>
    </div>
  );
}
