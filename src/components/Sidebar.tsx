import { NavLink } from "react-router-dom";
import support from "../assets/images/sidebarImage.svg";
import { useState } from "react";
import Icon from "./ui/Icon";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("dashboard");

    const navItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: Icon.dashboard,
            // path: "/dashboard",
        },
        {
            id: "projects",
            label: "Projects",
            icon: Icon.projects,
            // path: "/projects",
        },
        {
            id: "calendar",
            label: "Calendar",
            icon: Icon.calendar,
            // path: "/calendar",
        },
        {
            id: "vacations",
            label: "Vacations",
            icon: Icon.vacations,
            // path: "/vacations",
        },
        {
            id: "employees",
            label: "Employees",
            icon: Icon.employees,
            // path: "/employees",
        },
        {
            id: "messenger",
            label: "Messenger",
            icon: Icon.messenger,
            // path: "/messenger",
        },
        {
            id: "infoPortal",
            label: "Info Portal",
            icon: Icon.infoPortal,
            // path: "/info-portal",
        },
    ];

    return (
        <aside className="min-w-[200px] h-[calc(100vh-40px)] px-4 py-10 bg-white rounded-3xl flex flex-col justify-between">
            <section>
                <NavLink to="/" className="block mb-5 ml-2">
                    <Icon.companyLogo />
                </NavLink>

                <nav className="w-full min-h-[300px] font-semibold text-gray-500 flex flex-col justify-between mb-12">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={""}
                            onClick={() => setActiveItem(item.id)}
                            className={`flex gap-4 w-full text-left px-2 py-[10px] items-center rounded-[10px]  ${
                                activeItem === item.id
                                    ? "bg-[#ebf3ff] text-[#3F8CFF]"
                                    : "hover:bg-[#ebf3ff] text-[#7D8592]"
                            }`}
                        >
                            {activeItem === item.id
                                ? item.icon("#3F8CFF")
                                : item.icon("#7D8592")}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </section>

            <section>
                <div className="h-42 w-42 bg-blue-50 px-5 py-6 rounded-3xl relative flex items-end mb-4">
                    <img
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                        src={support}
                        alt="Support illustration"
                    />
                    <button
                        className="w-full px-4 py-3 rounded-2xl flex gap-2 justify-center text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                        onClick={() => {}}
                    >
                        <Icon.supportIcon />
                        <span>Support</span>
                    </button>
                </div>

                <button
                    className="w-full px-2 py-2.5 rounded-lg hover:bg-blue-50 flex gap-2 items-center transition-colors duration-200"
                    onClick={() => {}}
                >
                    <Icon.logoutIcon />
                    <span>Logout</span>
                </button>
            </section>
        </aside>
    );
};

export default Sidebar;
