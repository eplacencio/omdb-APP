"use client";

interface BackButtonProps {
  handleBack: () => void;
}

export default function BackButton({ handleBack }: Readonly<BackButtonProps>) {
  return (
    <button
      className="flex justify-center items-center text-white sm:text-2xl font-bebas bg-neutral-800 rounded-full p-2 h-10 w-10 sm:p-5 sm:w-15 sm:h-15 cursor-pointer text-lg"
      onClick={handleBack}
    >
      ←
    </button>
  );
}
