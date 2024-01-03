function parseCookie(cookie) {
  return cookie.trim().split('=');
}

export function getCookies() {
  return document.cookie.split(';').map(cookie => { 
    return parseCookie(cookie)
  });
}

export function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim())

  for (const cookie of cookies) {
    const [parsedName, parsedValue] = parseCookie(cookie);
    if (parsedName === cookieName) {
      return decodeURIComponent(parsedValue)
    }
  }

  return null
}

export function getCookieCount() {
  const cookies = document.cookie.trim()
  return cookies ? cookies.split(';').map(cookie => cookie.trim()).length : 0
}

export function setInitialCookies(cookies) {
  // Discard previous cookies
  document.cookie.split(';').forEach(cookie => {
    const [cookieName, _cookieValue] = parseCookie(cookie);
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  cookies.split(';').map(cookie => cookie.trim()).forEach(cookiePair => {
    document.cookie = cookiePair;
  });
}
