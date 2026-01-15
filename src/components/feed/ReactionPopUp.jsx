import { REACTIONS } from "../../utils/reaction";

export function ReactionPopup({ onSelect }) {
  return (
    <div
      className="
        bg-white shadow-xl rounded-full px-3 py-2
        flex gap-2
        animate-reaction-popup
        pointer-events-auto
      "
    >
      {REACTIONS.filter((r) => r.value != 0).map((r) => (
        <button
          key={r.type}
          onClick={() => onSelect(r.type, r.value)}
          className="
            text-2xl 
            transition-transform 
            hover:scale-150
            active:scale-125
          "
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}
