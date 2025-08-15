import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return (
        <>
            <div className="w-full mx-auto flex gap-[30px] p-5">
                <Sidebar />
                <div className="flex w-full flex-col gap-12">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default RootLayout;
