import { type RouteObject } from "react-router-dom"; 
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MemberPage from "../pages/MemberPage";

export const userRoutes: RouteObject[] = [
    {path: "/",element: <HomePage />},
    {path: "/login",element: <LoginPage />},
    {path: "/memberPage",element: <MemberPage />},
]