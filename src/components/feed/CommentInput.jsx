import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export function CommentInput({ post, onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(post.id, value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-3">
      <img src="images/default-avatar.jpg" className="w-8 h-8 rounded-full" />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Comment..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
      />

      <FaPaperPlane
        className="text-xl hover:text-blue-500 cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}
