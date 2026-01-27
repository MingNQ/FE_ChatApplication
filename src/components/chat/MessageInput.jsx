import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <div className="p-3 bg-white flex items-center gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button 
        onClick={() => handleSendMessage()}
        className="px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
        <FaPaperPlane className="text-2xl"/>
      </button>
    </div>
  );
}
