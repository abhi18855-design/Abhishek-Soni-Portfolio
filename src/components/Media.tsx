import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { asset } from '../utils/helpers';
export function Media({ src = '', alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className="media-fallback" role="img" aria-label={alt || 'Project visual unavailable'}><span>AS / VISUAL STUDY</span><small>IMAGE UNAVAILABLE</small></div>;
  return <img {...props} src={asset(src)} alt={alt || ''} onError={() => setFailed(true)} />;
}
