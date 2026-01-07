export function UserAvatar({ name }) {
  return (
    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      {name?.charAt(0).toUpperCase()}
    </div>
  );
}
