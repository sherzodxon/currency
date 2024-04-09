import {Route, Routes} from "react-router-dom";
import {routes} from "../../pages/routeConfig";
import Header from "../components/Header";


type AppLayoutProps = {}
const AppLayout : React.FC < AppLayoutProps > = () => {
   
    return (
        <div className="container">
         <Header/>
            <Routes>
                {routes.map(({path,id, element: Component}) => (
                    <Route key={id} path={path} element={< Component />}/> 
                ))}
            </Routes>
      </div>
         
      
    );
}

export default AppLayout;