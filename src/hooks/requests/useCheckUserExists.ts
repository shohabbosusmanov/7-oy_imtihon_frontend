import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/axios";

interface CheckUserData {
    phone_number: string;
    email: string;
}

interface Response {
    exists: boolean;
}

export default function useCheckUserExists() {
    return useMutation<Response, Error, CheckUserData>({
        mutationFn: async ({ phone_number, email }) => {
            const { data } = await api.post("/auth/check-user", {
                phone_number,
                email,
            });
            return data;
        },
    });
}
