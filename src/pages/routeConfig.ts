import {ElementType} from "react";
import Table from "../layouts/components/Table";
interface Route {
    id : number,
    path : string,
    element : ElementType;
}
export const routes : Route[] = [
    {
        id: 1,
        path: "/",
        element: Table
    }
]