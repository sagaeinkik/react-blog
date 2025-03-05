import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.scss";
import { RouterProvider } from 'react-router-dom';
import router from "./routing.tsx"
import { BlogPostProvider } from "./assets/context/PostContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogPostProvider>
      <RouterProvider router={router} />
    </BlogPostProvider>
  </StrictMode>,
)
