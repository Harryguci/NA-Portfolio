import type { ImgHTMLAttributes } from "react";
import { useCachedBlobUrl } from "../utils/cachedBlobUrl";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * Remote CDN image: one fetch, stored in Cache API + blob URL for faster reloads.
 */
export default function CachedRemoteImg({
  src,
  alt,
  className,
  ...rest
}: Props) {
  const resolved = useCachedBlobUrl(src);

  if (!resolved) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ minHeight: "12rem", background: "rgba(0,0,0,0.04)" }}
      />
    );
  }

  return <img {...rest} src={resolved} alt={alt ?? ""} className={className} />;
}
