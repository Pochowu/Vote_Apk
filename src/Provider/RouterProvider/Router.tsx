import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../../Pages/Home/Home";
import Create from "../../Pages/Events/Create/Create";
import List from "../../Pages/Events/List/List";
import Show from "../../Pages/Events/Show/Show";
import Edit from "../../Pages/Events/Edit/Edit";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/events',
        children: [
            {
                index: true,
                element: <List />
            },
            {
                path: "create",
                element: <Create/>
            },
             {
                path: "edit",
                element: <Edit/>
            },
            {
                path: ":id/read",
                element: <Show/>
            },
        ]
        
    },
])

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;