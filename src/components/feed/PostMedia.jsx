export function PostMedia({ media }) {
  if (!media?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-1">
      {media.map((m) =>
        m.type === "Image" ? (
          <img key={m.id} src={m.url} className="w-full" />
        ) : (
          <video key={m.id} src={m.url} controls />
        )
      )}
    </div>
  );
}
