export function ProfileAbout({ user, className = "" }) {
  return (
    <div className={`bg-white mt-4 rounded-xl shadow p-4 ${className}`}>
      <h2 className="font-semibold mb-2">About</h2>
      <p className="text-gray-700 mb-2">{user?.bio}</p>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>{user?.location ? "📍" + user?.location : ""}</li>
        <li>{user?.joinedAt ? "🕒 Joined at" + user?.joinedAt : ""}</li>
      </ul>
    </div>
  );
}
