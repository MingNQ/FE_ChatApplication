import { useState } from "react";

export function PostContent({ content }) {
  const [expanded, setExpanded] = useState(false);

  const renderText = () => {
    return content.split(/\s+/).map((word, i) => {
      if (word.startsWith("http")) {
        return (
          <a
            key={i}
            href={word}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline mr-1"
          >
            {word}
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

      return (
        <span key={i} className="mr-1">
          {word}
        </span>
      );
    });
  };

  return (
    <div className="flex px-4 text-gray-800 text-sm leading-relaxed">
      <div className={expanded ? "" : "line-clamp-4"}>{renderText()}</div>

      {content.length > 250 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-blue-500 text-sm hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
