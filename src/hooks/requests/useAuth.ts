import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/axios";

export const useAuth = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const res = await api.get("/users/me");
            return res.data.user;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
};
