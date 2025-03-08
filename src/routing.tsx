import { createBrowserRouter } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import PostPage from "./assets/pages/PostPage";
import PostsPage from "./assets/pages/PostsPage";
import NewPostPage from "./assets/pages/NewPostPage"
import Layout from "./assets/layouts/Layout";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout />,
        children: [
            {
                path: "/", 
                element: <HomePage />
            },
            {
                path: "/posts", 
                element: <PostsPage />
            },
            {
                path: "/post/:id", 
                element: <PostPage />
            },
            {
                path: "/createpost", 
                element: <NewPostPage />
            },
            {
                path: "/login", 
                element: <LoginPage />
            }
        ]
    }
]);

export default router