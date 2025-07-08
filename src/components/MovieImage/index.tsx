'use client';

import { useState, memo } from "react";
import { NotFoundImage } from "../NotFoundImage";
import { isValidUrl } from "@/utils/isValidUrl";
import Image from "next/image"

interface MovieImageProps {
  src: string
  title: string
  priority?: boolean
}

function MovieImageComponent({
  src,
  title,
  priority = false
}: Readonly<MovieImageProps>) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src || !isValidUrl(src)) {
    return <NotFoundImage/>;
  }

  return (
    <Image
      src={src}
      alt={title}
      className="w-full min-h-90 max-h-120 object-cover mb-2 rounded-xl sm:mb-0"
      width={500}
      height={750}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjY4NC43OC0tMUE3QjlDREVFSlNWW2NkZEJLRUn/2wBDARUXFx4aHR4eHUk4OCdJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      onError={() => setHasError(true)}
    />
  )
}

export const MovieImage = memo(MovieImageComponent);