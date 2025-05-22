/**
 * Sets a cookie in the browser with secure and SameSite attributes.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param days Number of days until the cookie expires. Default is 7.
 * @param path The path on the domain where the cookie will be available. Default is root.
 */
export function setCookie(
  name: string,
  value: string,
  days: number = 7,
  path: string = "/",
  options: {
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    httpOnly?: boolean;
  } = {}
): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}`;

  if (options.secure) {
    cookieStr += "; Secure";
  }

  if (options.sameSite) {
    cookieStr += `; SameSite=${options.sameSite}`;
  } else {
    cookieStr += "; SameSite=Lax"; // Default to Lax if not provided
  }

  if (options.httpOnly) {
    cookieStr += "; HttpOnly";
  }

  document.cookie = cookieStr;
}

/**
 * Retrieves a cookie from the browser by its name.
 * @param name The name of the cookie to retrieve.
 * @returns The value of the cookie if found, otherwise an empty string.
 */
export function getCookie(name: string): string {
  const cookie = document.cookie.match(
    `(^|;)\\s*${encodeURIComponent(name)}\\s*=\\s*([^;]+)`
  );
  return cookie ? decodeURIComponent(cookie.pop()!) : "";
}
