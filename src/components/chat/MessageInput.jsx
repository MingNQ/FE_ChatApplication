import { useState } from "react";

export function MessageInput() {
  const [text, setText] = useState("");

  return (
    <div className="p-3 bg-white flex items-center gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
        Send
      </button>
    </div>
  );
}
