import { Navigate } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useAuth } from "../hooks/requests/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading, isError } = useAuth();

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    if (isError || !data) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
