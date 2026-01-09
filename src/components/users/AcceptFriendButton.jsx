export function AcceptFriendButton({ onAccept }) {
  return (
    <button
      onClick={onAccept}
      className={`px-4 py-2 rounded-md text-sm font-medium transition bg-blue-600 text-white hover:bg-blue-700`}
    >
        Accept
    </button>
  );
}
