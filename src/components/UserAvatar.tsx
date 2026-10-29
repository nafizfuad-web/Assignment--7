"use client";

import Image from "next/image";
import { useState } from "react";

type UserAvatarProps = {
  alt: string;
  className: string;
  fallbackClassName: string;
  image?: string | null;
  name: string;
  size: number;
};

export function UserAvatar({
  alt,
  className,
  fallbackClassName,
  image,
  name,
  size,
}: UserAvatarProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null);

  if (!image || failedImage === image) {
    return (
      <span aria-hidden="true" className={fallbackClassName}>
        {name.slice(0, 1)}
      </span>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      height={size}
      onError={() => setFailedImage(image)}
      referrerPolicy="no-referrer"
      src={image}
      unoptimized
      width={size}
    />
  );
}
