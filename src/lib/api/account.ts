import { ApiResponse, MVBlog, MVNews, MVRace } from "../types/misc";

export const loginWithCredentials = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    }
    return null;
};

export const myPosts = async (token: string): Promise<null | ApiResponse<Array<MVBlog | MVNews | MVRace>>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/my-posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const posts = await response.json();
        return posts;
    }
    return null;
};

export const getSinglePost = async (slug: string, locale: string): Promise<null | ApiResponse<MVRace | MVBlog | MVNews>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAXVARIO_API}/post?slug=${slug}lang=${locale}`);
    if (response.ok) {
        const post = await response.json();
        return post;
    }
    return null;
}