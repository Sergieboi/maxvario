import { DEFAULT_LOCALE } from "../constants";
import {
  ApiResponse,
  CalendarResponse,
  Locale,
  SidebarContent,
  SiteTaxonomies,
  TaxonomyPage,
} from "../types/misc";

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
  // revalidate,
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
      // completely disable cache
      cache: "no-cache",
      // next: {
      // revalidate: revalidate || 1,
      // limit the cache to 120 seconds maximum
      // revalidate: revalidate ? 120 : 1,
      // },
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
      revalidate: 120,
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
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/calendar?lang=${locale}`,
    data,
    locale,
  });
  return response;
};

export const getCategories = async (
  locale: Locale
): Promise<ApiResponse<SiteTaxonomies>> => {
  const categories = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/categories?lang=${locale}`,
    revalidate: 300,
  });
  return categories;
};

export const getNews = async (locale: Locale) => {
  const news = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/news?lang=${locale}&order=desc&order_by=date&per_page=100`,
    locale,
    revalidate: 300,
  });
  return news;
};
export const getPosts = async (locale: Locale) => {
  const posts = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?lang=${locale}&order=desc&order_by=date&per_page=100`,
    locale,
    revalidate: 300,
  });
  return posts;
};

export const getSidebarContent = async (
  postType = "",
  locale: Locale
): Promise<null | ApiResponse<SidebarContent>> => {
  console.log(
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/sidebar?lang=${locale}&post_type=${postType}`
  );
  const content = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/sidebar?lang=${locale}&post_type=${postType}`,
    locale,
    revalidate: 120,
  });
  return content;
};

export const getStaticPage = async (slug: string, locale: Locale) => {
  const page = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/pages?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 120,
  });
  if (Array.isArray(page) && page.length > 0) {
    return page[0];
  }
  return null;
};

export const getRace = async (slug: string, locale: Locale) => {
  const race = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/races?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 120,
  });
  if (Array.isArray(race) && race.length > 0) {
    return race[0];
  }
  return null;
};

export const getNewsBlog = async (slug: string, locale: Locale) => {
  const blog = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/news?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (Array.isArray(blog) && blog.length > 0) {
    return blog[0];
  }
  return null;
};

export const getPostBlog = async (slug: string, locale: Locale) => {
  const blog = await fetcher({
    url: `${process.env.NEXT_PUBLIC_WP_API_URL}/posts?slug=${slug}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (Array.isArray(blog) && blog.length > 0) {
    return blog[0];
  }
  return null;
};

export const getTaxonomy = async (
  tax: string,
  term: string,
  locale: Locale
): Promise<null | ApiResponse<TaxonomyPage>> => {
  const taxonomy = await fetcher({
    url: `${process.env.NEXT_PUBLIC_MAXVARIO_API}/taxonomy?taxonomy=${tax}&term=${term}&lang=${locale}`,
    locale,
    revalidate: 600,
  });
  if (taxonomy) {
    return taxonomy;
  }
  return null;
};
