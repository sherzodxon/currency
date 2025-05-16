//import dashboard from '../../../assets/image/dashboard.svg';

import { ElementType } from "react";
import DashboardIcon from "../../../assets/image/DashboardIcon";
import HomeIcon from "../../../assets/image/HomeIcon";
import SettingsIcon from "../../../assets/image/SettingsIcon";
import TransactionIcon from "../../../assets/image/TransactionIcon";
interface Sidebar {
    id : number,
    to : string,
    title:string,
    active:boolean,
    icon : ElementType;
}
export const sidebarRoutes:Sidebar[]=[
    {
        id:1,
        to:"/",
        title:"Home",
        active:true,
        icon: HomeIcon
    },
    {
        id:2,
        to:"/dashboard",
        title:"Dashboard",
        active:false,
        icon:DashboardIcon
    },
    {
        id:3,
        to:"/transaction",
        title:"Transaction",
        active:false,
        icon:TransactionIcon,
    },
    {
        id:4,
        to:"/history",
        title:"History",
        active:false,
        icon:SettingsIcon
    }
]