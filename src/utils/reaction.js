export const REACTIONS = [
  { value: 0, type: "NONE", label: "reaction.like", emoji: "👍", color: "text-gray-600" },
  { value: 1, type: "LIKE", label: "reaction.like", emoji: "👍", color: "text-blue-500" },
  { value: 2, type: "LOVE", label: "reaction.love", emoji: "❤️", color: "text-red-500" },
  { value: 3, type: "HAHA", label: "reaction.haha", emoji: "😂", color: "text-yellow-500" },
  { value: 4, type: "WOW", label: "reaction.wow", emoji: "😮", color: "text-yellow-500" },
  { value: 5, type: "SAD", label: "reaction.sad", emoji: "😢", color: "text-yellow-500" },
  { value: 6, type: "ANGRY", label: "reaction.angry", emoji: "😡", color: "text-red-600" },
];

export function getTopReactions(reactions) {
  if (!reactions || reactions.length === 0) return [];

  const countMap = {};

  reactions.forEach((r) => {
    countMap[r.type] = (countMap[r.type] || 0) + 1;
  });

  return Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([type]) => type);
}
