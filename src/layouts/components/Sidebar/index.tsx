import { Link, useLocation } from "react-router-dom";
import { sidebarRoutes } from "./sidebarRoutes";
import './index.scss'
import { useEffect, useState } from "react";
import Logo from "../../../assets/image/Logo";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../redux/themeSlice/themeSlice";
import { useMediaPredicate } from "react-media-hook";

 
const Sidebar:React.FC=() => {
    const [checked,setchecked]= useState <Boolean>(false);
   
    let location = useLocation();
    const theme = useSelector((state:any)=>state.theme.theme) 
    const dispatch = useDispatch()
    const preferredTheme= useMediaPredicate("(prefers-color-scheme:dark)")?"dark":"light";
    const [name,setName]=useState <string>("system");
   
    useEffect(()=>{
    sidebarRoutes.forEach((el)=>{
    if (el.to==location.pathname) {
    el.active=true
    }
    else
    el.active=false
    setchecked(!checked)
    })
    },[location]);
  
    function handeButton(params:string) {
        switch (params) {
            case "light":
               setName("system");
               dispatch(changeTheme(preferredTheme));
                break;
            case "system":
                setName("dark");
                dispatch(changeTheme("dark"));
                break;
            default:
                setName("light")
                dispatch(changeTheme("light"))
                break;
        }
    }
    return (
       <section className="sidebar">
        <div className="sidebar-head">
            <a href="/" className="sidebar-head-link">
            <Logo/>
            </a>
           <button onClick={()=>handeButton(name)} className={`theme-button ${name}-button`}></button>
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