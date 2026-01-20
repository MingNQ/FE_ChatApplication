import { formatDateLabel } from "../utils/dateTimeUtils";

export function DateDivider({ date, showDate }) {
  const time = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="text-center text-xs text-gray-400 my-3">
      {showDate ? `${time} ${formatDateLabel(date)} ` : time}
    </div>
  );
}
