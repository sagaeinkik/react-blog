import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.scss";
import { RouterProvider } from 'react-router-dom';
import router from "./routing.tsx"
import { BlogPostProvider } from "./assets/context/PostContext.tsx"
import { AuthProvider } from "./assets/context/UserContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BlogPostProvider>
        <RouterProvider router={router} />
      </BlogPostProvider>
    </AuthProvider>
  </StrictMode>,
)
