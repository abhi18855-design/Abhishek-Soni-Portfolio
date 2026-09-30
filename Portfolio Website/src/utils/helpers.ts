export const asset = (path: string) => /^(https?:|data:|blob:)/.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
export const number = (value: number) => String(value).padStart(2, '0');
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
