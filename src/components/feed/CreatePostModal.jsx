import { useEffect, useState } from "react";
import { createPost } from "../../api/feedApi";
import { FaCamera } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function CreatePostModal({ onClose }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState(1);
  const { t } = useTranslation();

  const createPreviewFile = (file) => ({
    id: crypto.randomUUID(),
    file,
    url: URL.createObjectURL(file),
    type: file.type.startsWith("video") ? "video" : "image",
  });

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const previews = selectedFiles.map(createPreviewFile);

    setFiles((prev) => [...prev, ...previews]);
    e.target.value = "";
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleSubmit = async () => {
    if (!content.trim || (!content.trim() && files.length === 0)) return;

    const request = {
      content,
      visibility,
      files: files.map((f) => f.file),
    };
    console.log(request);

    try {
      const res = await createPost(request);
      console.log(res);
    } catch {
      alert("Error");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center m-0">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">{t("feed.createPost")}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("feed.whatIsOnYourMind")}
            className="w-full resize-none text-lg outline-none"
            rows={4}
          />

          {files.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg overflow-hidden"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      className="w-full h-32 object-cover"
                      alt=""
                    />
                  ) : (
                    <video
                      src={item.url}
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

          <label className="block mt-3 cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              hidden
              onChange={handleFilesChange}
            />
            <div className="flex gap-1 justify-center border rounded-lg p-3 text-center text-gray-600 hover:bg-gray-50">
              <FaCamera className="text-lg" /> {t("feed.addPhotosOrVideos")}
            </div>
          </label>

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="mt-3 w-full border rounded-lg p-2"
          >
            <option value="0">🔒 {t("common.private")}</option>
            <option value="1">🌍 {t("common.public")}</option>
            <option value="2">👥 {t("common.friends")}</option>
          </select>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            disabled={
              !content.trim() || (!content.trim() && files.length === 0)
            }
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {t("feed.createPost")}
          </button>
        </div>
      </div>
    </div>
  );
}
