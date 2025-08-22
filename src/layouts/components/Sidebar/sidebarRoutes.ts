//import dashboard from '../../../assets/image/dashboard.svg';

import { ElementType } from "react";
import DashboardIcon from "../../../assets/image/DashboardIcon";
import HomeIcon from "../../../assets/image/HomeIcon";
import TransactionIcon from "../../../assets/image/TransactionIcon";
import HistoryIcon from "../../../assets/image/HistoryIcon";

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
        title:"Asosiy",
        active:true,
        icon: HomeIcon
    },
    {
        id:2,
        to:"/dashboard",
        title:"Grafik",
        active:false,
        icon:DashboardIcon
    },
    {
        id:3,
        to:"/transaction",
        title:"Tranzaksiya",
        active:false,
        icon:TransactionIcon,
    },
    {
        id:4,
        to:"/history",
        title:"Arxiv",
        active:false,
        icon:HistoryIcon
    }
]