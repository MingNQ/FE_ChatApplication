export function ProfilePhotos() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-4 sm:grid-cols-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <img
          key={i}
          src={`https://picsum.photos/300?random=${i}`}
          className="aspect-square object-cover rounded-lg hover:scale-100 transition-transform"
        />
      ))}
    </div>
  );
}
