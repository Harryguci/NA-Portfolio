import AutoPlayVideo, { type AutoPlayVideoProps } from "./AutoPlayVideo";
import { useCachedBlobUrl } from "../utils/cachedBlobUrl";

type Props = Omit<AutoPlayVideoProps, "src"> & { src: string };

/**
 * Remote CDN video: resolves through Cache API + blob URL before attaching source.
 */
export default function CachedAutoPlayVideo({ src, className, ...rest }: Props) {
  const resolved = useCachedBlobUrl(src);

  if (!resolved) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ minHeight: "4rem", background: "rgba(0,0,0,0.04)" }}
      />
    );
  }

  return <AutoPlayVideo {...rest} src={resolved} className={className} />;
}
