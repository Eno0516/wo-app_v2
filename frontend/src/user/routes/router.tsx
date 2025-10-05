import { type RouteObject } from "react-router-dom"; 
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MemberPage from "../pages/MemberPage";

export const routes: RouteObject[] = [
    {path: "/",element: <HomePage />},
    {path: "/login",element: <LoginPage />},
    {path: "/memberPage",element: <MemberPage />},
    { path: "*", element: <h1>404 Not Found</h1>},
]