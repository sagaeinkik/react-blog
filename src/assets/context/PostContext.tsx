import { BlogPost, NewBlogPost, BlogPostResponse, BlogPostContextType } from "../types/post.type";
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
    success: null, 
    fetchPosts: async () => {},
    addPost: async () => {},
    updatePost: async () => {},
    deletePost: async () => {}, 
    resetSuccess: () => {}
});



//Provider
export const BlogPostProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    //States
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Funktion för att återställa success-meddelandet
    const resetSuccess = () => {
        setTimeout(() => {
            setSuccess(null);
        }, 5000)
    };

    
    //Fetch-anrop för att hämta alla inlägg
    const fetchPosts = async () => {
        //Nollställ error 
        setError(null);
        try {
            setLoading(true); 

            //Hämta alla inlägg
            const response = await fetch(apiUrl); 
            const data = await response.json();

            if(!response.ok) {
                setError(data.https_response?.message || data.message || "Kunde inte hämta inlägg...");
                return;
            }

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
            const data: BlogPostResponse = await response.json(); 

            if(!response.ok) {
                setError(data.https_response?.message || data.message || "Kunde inte skapa inlägg...");
                return;
            }
            
            //Om svaret är att det har gått bra
            if(data.post) {
                const addedPost: BlogPost = data.post;

                setSuccess(data.message);
                resetSuccess();

                //Uppdatera local state med nya posten
                setPosts(currentPosts => [addedPost, ...currentPosts]);
            }
            
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

        const data: BlogPostResponse = await response.json();

        if(!response.ok) {
            setError(data.https_response?.message || data.message || "Kunde inte uppdatera inlägg...");
            return;
        }
        
        //Om svaret är att posten är uppdaterad
        if(data.post) {
            setSuccess(data.message);
            //Uppdatera state
            setPosts(currentPosts => currentPosts.map(post => post._id === id ? { ...post, ...updatedPost } : post));
            resetSuccess();
        }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Något gick fel vid uppdatering av inlägget.");
        } finally {
            setLoading(false);
        }
    };


    //Ta bort inlägg
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
            const data = await response.json();

            if(!response.ok) {
                setError(data.https_response?.message || data.message || "Kunde inte ta bort inlägg...");
                return; 
            }

            if(data.post) {
                //Uppdatera local state
                setPosts(currentPosts => currentPosts.filter(post => post._id !== id));
                setSuccess(data.message);
                resetSuccess();
            }

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
        <BlogPostContext.Provider value={{posts, loading, error, success, fetchPosts, addPost, updatePost, deletePost, resetSuccess}}>
            {children}
        </BlogPostContext.Provider>)
}

//Hook för att använda context
export const useBlogPosts = () => useContext(BlogPostContext);
