import { useRef, useState } from "react";
import { ReactionPopup } from "./ReactionPopUp";
import { REACTIONS } from "../../utils/reaction";

export function ReactionButton({ myReaction, onReact }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);

  const reaction = myReaction
    ? REACTIONS.find((r) => r.value === myReaction.type) || REACTIONS[0]
    : REACTIONS[0];

  const handleOpen = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleClose = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  return (
    <div
      className="relative flex-1 flex justify-center"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {open && (
        <div
          className="absolute -top-10 z-50 ml-14"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <ReactionPopup onSelect={onReact} />
        </div>
      )}

      <button
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 font-medium ${reaction.color}`}
      >
        <span className="text-lg">{reaction.emoji}</span>
        <span>{reaction.label}</span>
      </button>
    </div>
  );
}
