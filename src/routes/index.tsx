import { createBrowserRouter, Navigate } from "react-router-dom";
import AppWrapperLayout from "../layouts/AppWrapperLayout";
import RootLayout from "../layouts/RootLayout";
import DashboardPage from "../pages/DashboardPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import MyProfilePage from "../pages/MyProfilePage";
import ProjectsPage from "../pages/ProjectsPage";
import CalendarPage from "../pages/CalendarPage";
import VacationsPage from "../pages/VacationsPage";
import EmployeesPage from "../pages/EmployeesPage";
import MessengerPage from "../pages/MessengerPage";
import InfoPage from "../pages/InfoPage";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";
import UploadPhotoPage from "../pages/UploadPhoto.page";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppWrapperLayout />,
        children: [
            {
                element: (
                    <ProtectedRoute>
                        <RootLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to="/dashboard" replace />,
                    },
                    {
                        path: "dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "myprofile",
                        element: <MyProfilePage />,
                    },
                    {
                        path: "settings",
                        element: <SettingsPage />,
                    },
                    {
                        path: "projects",
                        element: <ProjectsPage />,
                    },
                    {
                        path: "calendar",
                        element: <CalendarPage />,
                    },
                    {
                        path: "vacations",
                        element: <VacationsPage />,
                    },
                    {
                        path: "employees",
                        element: <EmployeesPage />,
                    },
                    {
                        path: "messenger",
                        element: <MessengerPage />,
                    },
                    {
                        path: "infoPortal",
                        element: <InfoPage />,
                    },
                    {
                        path: "upload-photo",
                        element: <UploadPhotoPage />,
                    },
                ],
            },
            {
                path: "sign-in",
                element: <SignInPage />,
            },
            {
                path: "sign-up",
                element: <SignUpPage />,
            },
        ],
    },
]);
