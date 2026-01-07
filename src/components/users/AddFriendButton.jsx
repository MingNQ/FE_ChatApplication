export function AddFriendButton({ isRequested, onAdd }) {
  return (
    <button
      disabled={isRequested}
      onClick={onAdd}
      className={`px-4 py-2 rounded-md text-sm font-medium transition
        ${
          isRequested
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
    >
      {isRequested ? "Pending" : "Add Friend"}
    </button>
  );
}
