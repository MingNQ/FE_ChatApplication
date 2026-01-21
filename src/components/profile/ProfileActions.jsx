export function ProfileActions({ isMe, isFriend }) {
  return (
    <div className="flex gap-2 justify-end">
      {isMe ? (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow">
          ✏️ Edit Profile
        </button>
      ) : (
        <>
          <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Message
          </button>
          {isFriend ? (
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              ✔️ Friend
            </button>
          ) : (
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              ➕ Add Friend
            </button>
          )}

          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            ⋯
          </button>
        </>
      )}
    </div>
  );
}
