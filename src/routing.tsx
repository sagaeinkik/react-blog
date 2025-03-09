import { createBrowserRouter } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import PostPage from "./assets/pages/PostPage";
import PostsPage from "./assets/pages/PostsPage";
import NewPostPage from "./assets/pages/NewPostPage"; 
import EditPage from "./assets/pages/EditPage"
import Layout from "./assets/layouts/Layout";
import ProtectedRoute from "./assets/components/ProtectedRoute"

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
                element: <ProtectedRoute><NewPostPage /></ProtectedRoute>
            },
            {
                path: "/edit/:id", 
                element: <ProtectedRoute><EditPage /></ProtectedRoute>
            },
            {
                path: "/login", 
                element: <LoginPage />
            }
        ]
    }
]);

export default router