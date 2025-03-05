import { BlogPost, NewBlogPost, BlogPostContextType } from "../types/post.type";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "../utils/cookieHandling";


//Variabler
let apiUrl: string = "https://blogapi.up.railway.app/posts";
const token: string | null = getCookie("jwt");

//Skapa en context
const BlogPostContext = createContext<BlogPostContextType>({
    posts: [], 
    loading: false, 
    error: null, 
    fetchPosts: async () => {},
    addPost: async () => {},
    updatePost: async () => {},
    deletePost: async () => {}
});

//Provider
export const BlogPostProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    //States
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    //Fetch-anrop för att hämta alla inlägg
    const fetchPosts = async () => {
        //Nollställ error 
        setError(null);
        try {
            setLoading(true); 

            //Hämta alla inlägg
            const response = await fetch(apiUrl); 

            if(!response.ok) {
                throw new Error("Kunde inte hämta poster...");
            }

            const data = await response.json();
            setPosts(data); 

        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid hämtning av alla inlägg.");
        } finally {
            //Slå om loading till false
            setLoading(false);
        }
    };

    //Lägg till inlägg
    const addPost = async (newPost: NewBlogPost) => {
        setError(null); 

        try {
            setLoading(true);

            const response = await fetch(apiUrl, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`
                }, 
                body: JSON.stringify(newPost)
            });

            if(!response.ok) {
                throw new Error("Något gick fel vid skapandet av inlägg...");
            }

            const addedPost: BlogPost = await response.json(); 

            //Uppdatera local state med nya posten
            setPosts(currentPosts => [addedPost, ...currentPosts]);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid skapandet av inlägget.");
        } finally {
            setLoading(false); 
        }
    };

    //Uppdatera befintligt inlägg
    const updatePost = async (id: number, updatedPost: NewBlogPost) => {
        setError(null); 

        try {
            setLoading(true); 

            //Anrop
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify(updatedPost)
        });

        if(!response.ok) {
            throw new Error("Något gick fel vid uppdatering av inlägg...");
        }
        
        //Uppdatera local state
        setPosts(currentPosts => currentPosts.map(post => post._id === id ? { ...post, ...updatedPost } : post));

        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid uppdatering av inlägget.");
        } finally {
            setLoading(false);
        }
    };


    const deletePost = async (id: number) => {
        setError(null);

        try {
            setLoading(true); 

            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(!response.ok) {
                throw new Error("Något gick fel vid borttagning av inlägg...");
            }

            //Uppdatera local state
            setPosts(currentPosts => currentPosts.filter(post => post._id !== id));

        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid borttagning av inlägget.");
        } finally {
            setLoading(false);
        }
    };

    //Hämta inlägg vid mount
    useEffect(() => {
        fetchPosts();
    }, []);

    //Returnera allt!
    return (
        <BlogPostContext.Provider value={{posts, loading, error, fetchPosts, addPost, updatePost, deletePost}}>
            {children}
        </BlogPostContext.Provider>)
}

//Hook för att använda context
export const useBlogPosts = () => useContext(BlogPostContext);
