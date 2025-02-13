import {Route, Routes} from "react-router-dom";
import {routes} from "../../pages/routeConfig";
import Header from "../../assets/components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";


type AppLayoutProps = {}
const AppLayout : React.FC < AppLayoutProps > = () => {
   const theme = useSelector((state:any)=>state.theme.theme) 

    return (
    <main style={{backgroundColor:theme=="dark"?"#0E1418":"#B8C1D7"}} className="main">
             <Sidebar/>
        <div className="container" style={{backgroundColor:theme=="dark"?"#212537":"#D3D7E0"}}>
            <Routes>
                {routes.map(({path,id, element: Component}) => (
                    <Route key={id} path={path} element={< Component />}/> 
                ))}
            </Routes> 
        </div>
    </main>
    );
}

export default AppLayout;