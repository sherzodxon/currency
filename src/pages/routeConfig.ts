import {ElementType} from "react";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import SettingsPage from "./SettingsPage";
import TransactionPage from "./TransactionPage";
interface Route {
    id : number,
    path : string,
    element : ElementType;
}
export const routes : Route[] = [
    {
        id: 1,
        path: "/",
        element: HomePage
    },
    {
        id:2,
        path:"/dashboard",
        element:DashboardPage
    },
    {
        id:3,
        path:"/transaction",
        element:TransactionPage
    },
    {
        id:4,
        path:"/settings",
        element:SettingsPage
    }
]