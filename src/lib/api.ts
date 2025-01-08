import { DEFAULT_LOCALE, REVALIDATE } from "./constants";
import { ApiResponse, CalendarResponse, Locale } from "./types/misc";

type Fetcher = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown>;
  locale?: Locale;
  revalidate?: number;
  token?: string;
};
export const fetcher = async ({
  url,
  method,
  data,
  locale,
  revalidate,
  token,
}: Fetcher) => {
  try {
    const response = await fetch(url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale || DEFAULT_LOCALE,
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: data ? JSON.stringify(data) : undefined,
      cache: "force-cache",
      next: {
        revalidate: revalidate || 1,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getHome = async (locale: Locale) => {
  try {
    const data = await fetcher({
      url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/home?lang=${locale}`,
      revalidate: REVALIDATE.home,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCalendar = async (
  data: Record<string, unknown> | undefined,
  locale: Locale
): Promise<ApiResponse<CalendarResponse> | null> => {
  const response = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/calendar?after=${new Date().toISOString().split('T')[0]}`,
    data,
    locale,
  });
  return response;
};
