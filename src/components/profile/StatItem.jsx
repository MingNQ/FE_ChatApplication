export function StatItem({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{icon}</div>
      <p className="text-lg font-semibold mt-1">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}
