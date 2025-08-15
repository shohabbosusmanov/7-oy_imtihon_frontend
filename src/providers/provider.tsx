import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
