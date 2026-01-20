function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return "Recent";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day ago`;

  return new Date(date).toLocaleDateString("vi-VN");
}

export function getWeekdayLabel(date) {
  const d = new Date(date);

  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return weekdays[d.getDay()];
}

function subDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function shouldShowDateDivider(curr, prev) {
  if (!prev) return true;

  return !isSameDay(new Date(curr.sentAt), new Date(prev.sentAt));
}

function shouldShowTimeDivider(curr, prev) {
  if (!prev) return false;

  const diff = new Date(curr.sentAt) - new Date(prev.sentAt);

  return diff > 15 * 60 * 1000;
}

function formatDateLabel(date) {
  const d = new Date(date);

  return getWeekdayLabel(d);
}

export {
  formatTimeAgo,
  shouldShowDateDivider,
  shouldShowTimeDivider,
  formatDateLabel,
};
