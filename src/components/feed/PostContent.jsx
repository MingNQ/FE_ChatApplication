import { useState } from "react";
import { useTranslation } from "react-i18next";

export function PostContent({ content }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const renderText = () => {
    return content.split(/\s+/).map((word, i) => {
      if (word.startsWith("http")) {
        return (
          <a
            key={i}
            href={word}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline break-words"
          >
            {word + " "}
          </a>
        );
      }

      if (word.startsWith("#")) {
        return (
          <span key={i} className="text-blue-500 mr-1 cursor-pointer">
            {word}
          </span>
        );
      }

      return <span key={i}>{word + " "}</span>;
    });
  };

  return (
    <div className="flex flex-col px-4 pb-2 text-gray-800 text-sm leading-relaxed">
      <div
        className={`text-justify whitespace-normal break-words ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {renderText()}
      </div>

      {content.length > 250 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-blue-500 text-sm hover:underline self-start"
        >
          {expanded ? t("feed.seeLess") : t("feed.seeMore")}
        </button>
      )}
    </div>
  );
}
