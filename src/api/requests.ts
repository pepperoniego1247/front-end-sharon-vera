import { useMutation, useQuery } from "@tanstack/react-query";

export const LoadData = (name: string, url: string) => {
    return useQuery({
        queryKey: [name],
        queryFn: async () => {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${ localStorage.getItem("jwt") }`
                }
            });

            if (!response.ok) throw new Error(`HTTP ERROR EN ${name.toLocaleUpperCase()}`);
            return response.json();
        }
    });
}

export const RegisterData = (name: string, url: string, body: any) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${ localStorage.getItem("jwt") }`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw Error(`http error en ${ name }`);
            return response.json();
        }
    });
}

export const UpdateData = (name: string, url: string, body: any) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${ localStorage.getItem("jwt") }`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw Error(`http error en ${ name }`);
            return response.json();
        }
    });
}

export const DeleteData = (name: string, url: string) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${ localStorage.getItem("jwt") }`
                }
            });

            if (!response.ok) throw new Error("HTTP ERROR" + name);
            return response.json();
        }
    });
}