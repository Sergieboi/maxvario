export const loginWithCredentials = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
    });
    if (response.ok) {
        return response.json();
    }
    return null;
};
