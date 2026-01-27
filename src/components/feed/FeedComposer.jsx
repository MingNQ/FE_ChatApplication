import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { FaCamera, FaGrin, FaVideo } from "react-icons/fa";

export default function FeedComposer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`bg-white rounded-xl p-4 shadow mb-4
          ${open ? "pointer-events-none opacity-60" : "cursor-pointer"}
        `}
      >
        <input
          placeholder="What's on your mind?"
          disabled={open}
          className={`w-full px-4 py-3 bg-gray-100 rounded-full outline-none cursor-pointer
            ${open ? "opacity-60 cursor-not-allowed" : ""}
            `}
        />

        <div className="flex justify-between mt-3 text-base text-gray-600">
          <button type="button" className="flex gap-1 hover:text-blue-500">
            <FaCamera className="text-xl" /> Photo
          </button>
          <button type="button" className="flex gap-1 hover:text-gray-500">
            <FaVideo className="text-xl" /> Video
          </button>
          <button type="button" className="flex gap-1 hover:text-yellow-500">
            <FaGrin className="text-xl" /> Feeling
          </button>
        </div>
      </div>

      {open && <CreatePostModal onClose={() => setOpen(false)} />}
    </>
  );
}
