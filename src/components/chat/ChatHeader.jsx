import { usePresenceStore } from "../../stores/presenceStore";
import { formatTimeAgo } from "../../utils/dateTimeUtils";

export function ChatHeader({ user }) {
  const isOnline = usePresenceStore((state) => state.isOnline(user?.id));
  const presence = usePresenceStore((state) => state.getPresence(user?.id));

  console.log(presence);

  return (
    <div className="h-16 bg-white flex items-center px-4 gap-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
          {user?.fullName[0]}
        </div>

        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold leading-tight">{user?.fullName}</span>
        <span className="text-xs text-gray-500">
          {isOnline ? "Online" : "Offline " + formatTimeAgo(presence?.lastSeenAt)}
        </span>
      </div>
    </div>
  );
}
