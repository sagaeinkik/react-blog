import { useState, useEffect } from 'react';
import { useParams, /* useNavigate */ } from 'react-router-dom'; 
import { useBlogPosts } from "../context/PostContext";
/* import { useAuth } from "../context/UserContext"; */


const EditPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, loading, error, success, updatePost } = useBlogPosts();
    /* const {isAuthenticated} = useAuth();
    const navigate = useNavigate(); */

    //Hitta inlägg
    const post = posts.find(post => String(post._id) === id);

    //Lokala states
    const [title, setTitle] = useState<string>(post?.title || "");
    const [content, setContent] = useState<string>(post?.content || "");
    const [validError, setValidError] = useState<string | null>(null);

    //Läs in värdena från post 
    useEffect(() => {
        //Omdirigera användare
        /* if(!isAuthenticated) {
            navigate("/login");
        } */

        if(post) {
            setTitle(post.title);
            setContent(post.content);
        }

    }, [])

    const handleSubmit = async(e: any) => {
        setValidError(null);
        e.preventDefault();


        //Snabb validering
        if(title.trim() === "" || content.trim() === "") {
            setValidError("Fyll i alla fält");
            return;
        };

        //Uppdatera inlägg
        await updatePost(id!, {title, content});
    }


  return (
    <div className="page-wrap">
        <h2>Redigera inlägg</h2>
        { error && <p className="error">{error}</p> }
        { validError && <p className="error">{validError}</p> }
        { loading && <p>Laddar...</p> }
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Titel</label>
                <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required value={title}/>
            </div>
            <div className="form-group">
                <label htmlFor="content">Innehåll</label>
                <textarea id="content" name="content" onChange={(e) => setContent(e.target.value)} required value={content}></textarea>
            </div>
            <input type="submit" value="Spara" />
        </form>
    </div>
  )
}

export default EditPage