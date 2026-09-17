import { auth } from "../../../auth";
import { wpRequest } from "./wp";
import { ApiResponse, MVBlog, MVNews, MVRace, ProfileFields, UserSubscription } from "../types/misc";

export const loginWithCredentials = async (email: string, password: string) => {
  const res = await wpRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/jwt-auth/v1/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    }
  );
  if (!res || res.status < 200 || res.status >= 300) return null;
  return JSON.parse(res.body);
};

export const myPosts = async (
  token: string
): Promise<null | ApiResponse<Array<MVBlog | MVNews | MVRace>>> => {
  const res = await wpRequest(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/my-posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res || res.status < 200 || res.status >= 300) return null;
  return JSON.parse(res.body);
};

export const editPost = async (
  id: number | string,
  locale: string
): Promise<null | ApiResponse<MVRace | MVBlog | MVNews>> => {
  const res = await wpRequest(
    `${process.env.NEXT_PUBLIC_MAXVARIO_API}/post?post_id=${id}&lang=${locale}`
  );
  if (!res || res.status < 200 || res.status >= 300) return null;
  return JSON.parse(res.body);
};

export const getUsreProfile = async (): Promise<null | ApiResponse<ProfileFields>> => {
  const session = await auth();
  const res = await wpRequest(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/me`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });
  if (!res || res.status < 200 || res.status >= 300) return null;
  return JSON.parse(res.body);
};

export const getSubscriptions = async (): Promise<null | ApiResponse<Array<UserSubscription>>> => {
  const session = await auth();
  const res = await wpRequest(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/subscriptions`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });
  if (!res || res.status < 200 || res.status >= 300) return null;
  return JSON.parse(res.body);
};
