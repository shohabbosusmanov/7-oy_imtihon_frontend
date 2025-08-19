import { useState } from "react";

const NavigationTabs = () => {
    const [activeTab, setActiveTab] = useState("Projects");

    const tabs = [
        { id: "Projects", label: "Projects" },
        { id: "Team", label: "Team" },
        { id: "My vacations", label: "My vacations" },
    ];

    return (
        <div className="flex items-center p-1 bg-gray-100 rounded-full max-w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
            px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ease-in-out
            ${
                activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
            }
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default NavigationTabs;
