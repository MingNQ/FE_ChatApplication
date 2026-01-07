import { UserAvatar } from "./UserAvatar";
import { AddFriendButton } from "./AddFriendButton";

export function UserCard({ user, isRequested, onAddFriend }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <UserAvatar name={user.fullName} />

        <div>
          <p className="font-medium text-gray-900">{user.fullName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <AddFriendButton
        isRequested={isRequested}
        onAdd={onAddFriend}
      />
    </div>
  );
}