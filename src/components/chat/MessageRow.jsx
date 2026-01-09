export function MessageRow({ me, children }) {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      {children}
    </div>
  );
}
