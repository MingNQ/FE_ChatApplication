import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { FaCamera, FaGrin, FaVideo } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function FeedComposer() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`bg-white rounded-xl p-4 shadow mb-4
          ${open ? "pointer-events-none opacity-60" : "cursor-pointer"}
        `}
      >
        <div className="flex items-center gap-3">
          <img
            src="images/default-avatar.jpg"
            className="w-10 h-10 rounded-full"
          />

          <input
            placeholder={t("feed.whatIsOnYourMind")}
            disabled={open}
            className={`w-full h-10 px-4 bg-gray-100 rounded-full outline-none cursor-pointer
            ${open ? "opacity-60 cursor-not-allowed" : ""}
            `}
          />
        </div>

        <div className="flex justify-between mt-3 text-base text-gray-600">
          <button type="button" className="flex gap-1 hover:text-blue-500">
            <FaCamera className="text-xl" /> {t("common.photo")}
          </button>
          <button type="button" className="flex gap-1 hover:text-gray-500">
            <FaVideo className="text-xl" /> {t("common.video")}
          </button>
          <button type="button" className="flex gap-1 hover:text-yellow-500">
            <FaGrin className="text-xl" /> {t("common.feeling")}
          </button>
        </div>
      </div>

      {open && <CreatePostModal onClose={() => setOpen(false)} />}
    </>
  );
}
