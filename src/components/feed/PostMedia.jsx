export function PostMedia({ media }) {
  if (!media || media.length === 0) return null;

  const isSingle = media.length === 1;

  return (
    <div className={`grid gap-1 ${isSingle ? "grid-cols-1" : "grid-cols-2"}`}>
      {media.map((m) =>
        m.attachment.type.startsWith("image") ? (
          <img
            key={m.attachment.id}
            src={m.attachment.fullPathUrl}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
        ) : (
          <video
            key={m.attachment.id}
            src={m.attachment.fullPathUrl}
            controls
            className="w-full h-full rounded-md"
          />
        ),
      )}
    </div>
  );
}
