
import { useBlogPosts } from "../context/PostContext";

import { useState } from 'react';


const NewPostPage = () => {
    
    const { error, loading, success, addPost } = useBlogPosts();

    //States
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validError, setValidError] = useState<string | null>(null);


    //Formulär
    const handleSubmit = (e: any) => {
        e.preventDefault(); 
        setValidError(null);
        

        //Kolla om titel och innehåll är tomt
        if(title.trim() === "" || content.trim() === "") {
            setValidError("Fyll i alla fält");
            return;
        }
        
        //Lägg till 
        addPost({title, content});

        if(success !== "" && !loading) {
            //Töm formuläret
            setTitle('');
            setContent('');
        }

    }


  return (
    <div className="page-wrap">
        <h2>Skapa ett nytt inlägg</h2>
        { error && <p className="error">{error}</p>}
        { validError && <p className="error">{validError}</p>}
        { success && <p className="success">{success}</p>}
        <form className="blogpost-form">
            <div className="form-group">
                <label htmlFor="title">Titel</label>
                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} required value={title}/>
            </div>
            <div className="form-group">
                <label htmlFor="content">Innehåll</label>
                <textarea name="content" id="content" onChange={(e) => setContent(e.target.value)} required value={content}></textarea>
            </div>
        </form>
        <input type="submit" value={loading ? "Lägger till" : "Lägg till"} onClick={handleSubmit}/>
    </div>
  )
}

export default NewPostPage