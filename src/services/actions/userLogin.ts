"use server"

import { TLoginFormValues } from "@/app/login/page";


export default async function userLogin(data: TLoginFormValues) {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
            cache:"no-store"
        });

        if (!res.ok) {
            // Handle non-success responses (like 404, 500, etc.)
            throw new Error(`Request failed with status ${res.status}`);
        }

        const loginInfo = await res.json();
        return loginInfo;
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error; 
    }
}