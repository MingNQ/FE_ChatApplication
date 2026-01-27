import { FaCheck, FaEdit, FaEllipsisH, FaUserPlus } from "react-icons/fa";

export function ProfileActions({ isMe, isFriend }) {
  return (
    <div className="flex gap-2 justify-end">
      {isMe ? (
        <button className="px-4 py-3 text-gray rounded-lg shadow-lg flex gap-2 hover:bg-gray-100">
          <FaEdit className="text-xl" /> Edit Profile
        </button>
      ) : (
        <>
          <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Message
          </button>
          {isFriend ? (
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 flex gap-2">
              <FaCheck className="text-xl" /> Friend
            </button>
          ) : (
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 flex gap-2">
              <FaUserPlus className="text-xl" /> Add Friend
            </button>
          )}

          <button className="px-3 py-2 border rounded-lg hover:bg-gray-100">
            <FaEllipsisH />
          </button>
        </>
      )}
    </div>
  );
}
