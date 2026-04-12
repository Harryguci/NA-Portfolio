import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * Remote CDN images use the real URL on `<img>` so the browser (and ImageKit)
 * handle format/DPR correctly. A fetch→blob pipeline can look soft or pixelated.
 */
export default function CachedRemoteImg({
  src,
  alt,
  className,
  ...rest
}: Props) {
  return <img {...rest} src={src} alt={alt ?? ""} className={className} />;
}
