import Cookies from "universal-cookie";

type CookiesValue = any;

export const getCookies = (key: string): CookiesValue => {
  const cookies = new Cookies();
  return cookies.get(key);
};

export const setCookies = (key: string, value: CookiesValue) => {
  const cookies = new Cookies();
  cookies.set(key, value, { path: "/" });
};

export const removeCookies = (key: string) => {
  const cookies = new Cookies();
  cookies.remove(key, { path: "/" });
};

export const getAuthToken = (): string => getCookies('authorization');
export const removeAuthToken = () => removeCookies('authorization');
