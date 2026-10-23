const LOCAL_ORIGIN = "http://localhost";

export function getSafeCallbackURL(callbackURL?: string): string {
  if (!callbackURL) return "/profile";

  const url = new URL(callbackURL, LOCAL_ORIGIN);
  if (url.origin !== LOCAL_ORIGIN) return "/profile";

  return `${url.pathname}${url.search}${url.hash}`;
}
