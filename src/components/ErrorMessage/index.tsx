"use client";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  moreInfo?: string;
  handleBack?: () => void
}

export default function ErrorMessage({
  title = "Oops!",
  message = "Not found",
  moreInfo,
  handleBack
}: Readonly<ErrorMessageProps>) {
  return (
    <div className="bg-neutral-800 py-8 px-6 rounded-xl flex flex-col items-center text-center max-w-xl mx-auto max-h-fit shadow-2xl w-full">
      <p className="text-8xl text-red-600 mb-2 font-bebas">404</p>
      <h2 className="text-2xl text-neutral-400 font-bold">{title}</h2>
      {message && <p className="text-neutral-300 my-2">{message}</p>}
      {moreInfo && (
        <p className="text-neutral-300">
          {moreInfo}
        </p>
      )}
      {handleBack && (
        <button className="cursor-pointer underline text-red-800 mt-4 hover:text-red-600" onClick={handleBack}>Go home</button>
      )}
    </div>
  );
}
