export default function DotLoader() {
  return (
    <div className="flex justify-center items-center gap-1 h-10" data-testid="dot-loader">
      <span
        className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]"
        data-testid="dot"
      ></span>
      <span
        className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]"
        data-testid="dot"
      ></span>
      <span
        className="w-2 h-2 rounded-full bg-white animate-bounce"
        data-testid="dot"
      ></span>
    </div>
  );
}