import { useEffect, useState } from "react";
import { FaImage, FaPaperPlane, FaSmile } from "react-icons/fa";
import { uploadMultipleFile } from "../../api/uploadFileApi";

export function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleSendMessage = () => {
    if (!text.trim() && files.length <= 0) return;
    const ids = files.map((file) => file.id);
    onSend(text, ids);
    setText("");
    setFiles([]);
  };

  const handleFilesChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const response = await uploadMultipleFile(selectedFiles);
    const previews = response.result;

    setFiles((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.fullPathUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.fullPathUrl));
    };
  }, [files]);

  return (
    <>
      {files?.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3 px-3 pt-3 bg-white">
          {files.map((item) => (
            <div key={item.id} className="relative rounded-lg overflow-hidden">
              {item.type.startsWith("image") ? (
                <img
                  src={item.fullPathUrl}
                  className="w-full h-32 object-cover"
                  alt=""
                />
              ) : (
                <video
                  src={item.fullPathUrl}
                  controls
                  className="w-full h-32 object-cover"
                />
              )}

              <button
                onClick={() => removeFile(item.id)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 bg-white flex items-center gap-2">
        <label className="block cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            hidden
            onChange={handleFilesChange}
          />
          <div className="flex gap-1 justify-center p-3 text-center text-gray-600 hover:bg-gray-100 rounded-lg">
            <FaImage className="text-2xl" />
          </div>
        </label>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <div className="flex gap-1 justify-center p-3 text-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
          <FaSmile className="text-2xl" />
        </div>

        <button
          onClick={() => handleSendMessage()}
          className="px-4 py-3 rounded-full hover:bg-gray-100"
        >
          <FaPaperPlane className="text-2xl" />
        </button>
      </div>
    </>
  );
}
