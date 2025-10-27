import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export const LOGO_SRC = '/images/LOGO VISION360.png';

type BrandLogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  className?: string;
};

export function BrandLogo({ className, ...props }: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="WINFIN • Vision360IA"
      width={200} 
      height={50}
      className={cn("dark:invert", className)}
      {...props}
    />
  );
}
