import { ProfileActions } from "./ProfileActions";

export function ProfileHeader({ user, isMe, isFriend }) {
  return (
    <div className="relative bg-gray-100 rounded-xl shadow overflow-hidden">
      <div className="w-full h-56 sm:h-64">
        <img
          src={user?.coverUrl ?? "/images/default-cover.png"}
          alt=""
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70 pointer-events-none" />
      </div>

      <div className="px-6 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={user?.avatarUrl ?? "/images/default-avatar.jpg"}
                alt="avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-fit shadow-md"
              />
              {user?.isOnline && (
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold truncate">
              {user?.fullName}
            </h1>
            <p className="text-sm text-gray-500 truncate">@{user?.userName}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <ProfileActions isMe={isMe} isFriend={isFriend}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}