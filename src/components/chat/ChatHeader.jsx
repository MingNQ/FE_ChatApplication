import { useTranslation } from "react-i18next";
import { usePresenceStore } from "../../stores/presenceStore";

export function ChatHeader({ user }) {
  const isOnline = usePresenceStore((state) => state.isOnline(user?.id));
  const { t } = useTranslation();

  return (
    <div className="h-16 bg-white flex items-center px-4 gap-3">
      <div className="relative">
        <div className="w-10 h-10 text-white flex items-center justify-center cursor-pointer">
          <img
            src={user?.avatar ?? "images/default-avatar.jpg"}
            className="rounded-full hover:scale-105 transition"
          />
        </div>

        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold leading-tight">{user?.fullName}</span>
        <span className="text-xs text-gray-500">
          {isOnline
            ? t("common.online")
            : t("common.offline")}
        </span>
      </div>
    </div>
  );
}
