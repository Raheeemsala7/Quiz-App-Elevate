
"use server"

export const sendEmailVerificationApi = async (email: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Something went wrong");
    }

    return res.json();
}

export const verifyCodeEmailApi = async (code: string , email: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email ,code }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Something went wrong");
    }

    return res.json();
}
