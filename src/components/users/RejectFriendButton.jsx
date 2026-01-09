export function RejectFriendButton({ onReject }) {
  return (
    <button
      onClick={onReject}
      className={`px-4 py-2 rounded-md text-sm font-medium transition bg-gray-400 text-white-400 hover:bg-gray-500`}
    >
        Reject
    </button>
  );
}
