import { createBrowserRouter, RouteObject } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PostDetails from "../pages/PostDetails";
import AdminPanel from "../pages/AdminPanel";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/post/:id",
    element: <PostDetails />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
];

export const router = createBrowserRouter(routes);
