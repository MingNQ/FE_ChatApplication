export function MessageBubble({ text, me }) {
  return (
    <div
      className={`
        inline-block
        max-w-[50%]
        px-4 py-2
        rounded-2xl
        text-sm
        break-words
        whitespace-pre-wrap
        ${me ? "bg-blue-500 text-white" : "bg-white text-gray-800"}
      `}
    >
      {text}
    </div>
  );
}
