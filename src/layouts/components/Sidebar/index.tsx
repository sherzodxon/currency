import { Link, useLocation } from "react-router-dom";
import { sidebarRoutes } from "./sidebarRoutes";
import './index.scss'
import { useEffect, useState } from "react";
import Logo from "../../../assets/image/Logo";
import { useSelector } from "react-redux";

 
const Sidebar:React.FC=() => {
    const [checked,setchecked]= useState <Boolean>(false);
    let location = useLocation();
    const theme = useSelector((state:any)=>state.theme.theme) 
     
   
     
    useEffect(()=>{
    sidebarRoutes.forEach((el)=>{
    if (el.to==location.pathname) {
    el.active=true
    }
    else
    el.active=false
    setchecked(!checked)
    })
    },[location])
    
    return (
       <section className="sidebar">
        <div className="sidebar-head">
            <a href="/" className="sidebar-head-link">
            <Logo/>
             <span style={{color:theme=="dark"?"#fff":"#111C42"}}>Valyuta</span>
            </a>
        </div>
        <ul className="sidebar-list">
            {
                sidebarRoutes.map(({id,to,title,active,icon:Component})=>
                <li className="sidebar-item" key={id}>
                    <Link className={active?`sidebar-${theme}-link--active`:`sidebar-${theme}-link`} to={to}>
                    <Component/>
                    <span className="sidebar-item-title">{title}</span>
                    </Link>
                </li>
                )
            }
        </ul>
       </section>
    );
}
 
 
export default Sidebar;