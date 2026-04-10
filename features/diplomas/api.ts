



export const getDiplomasApi = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Something went wrong");
    }

    return res.json()

    
}