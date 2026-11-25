import { useState } from 'react';
import { Flower2 } from 'lucide-react';

interface BotanicalImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function BotanicalImage({
  src,
  alt,
  className = '',
  priority = false,
}: BotanicalImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-leaf-tint text-leaf-deep p-6 text-center ${className}`}
      >
        <Flower2 className="w-8 h-8 mb-2 opacity-80" aria-hidden="true" />
        <span className="font-serif text-lg font-medium leading-snug max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-95'} ${className}`}
    />
  );
}
