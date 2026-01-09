import { UserAvatar } from "./UserAvatar";
import { AddFriendButton } from "./AddFriendButton";
import { AcceptFriendButton } from "./AcceptFriendButton";
import { RejectFriendButton } from "./RejectFriendButton";

export function UserCard({
  user,
  isRequested,
  onAddFriend,
  isReceived,
  onAccept,
  onReject,
  isFriend,
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <UserAvatar name={user.fullName} />

        <div>
          <p className="font-medium text-gray-900">{user.fullName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {isFriend ? (
        <></>
      ) : isReceived ? (
        <>
          <div>
            <AcceptFriendButton onAccept={onAccept} />

            <RejectFriendButton onReject={onReject} />
          </div>
        </>
      ) : (
        <AddFriendButton isRequested={isRequested} onAdd={onAddFriend} />
      )}
    </div>
  );
}
