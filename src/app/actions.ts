'use server'

import { signIn } from "../../auth"
 
export async function login(formData: { email: string, password: string }) {
    signIn("credentials", formData);
}