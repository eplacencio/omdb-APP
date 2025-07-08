export function NotFoundImage() {
  return (
    <div
      data-testid="not-found-container"
      className='bg-neutral-700 items-center justify-center text-center text-4xl w-full h-90 rounded-xl text-neutral-500 flex flex-col'
    >
      <p className="tracking-widest">
        4☹︎4
      </p>
      <p className="text-sm">
        not found
      </p>
    </div>
  );
}
