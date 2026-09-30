import type { AnchorHTMLAttributes } from 'react';
export function MagneticButton({ children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) { return <a {...props} className={`magnetic ${className}`}>{children}</a>; }
