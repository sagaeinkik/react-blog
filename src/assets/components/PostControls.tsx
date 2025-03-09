import { useBlogPosts } from "../context/PostContext"
import { useNavigate } from "react-router-dom"
import "../scss/_PostControls.scss";

const PostControls = ({ postid, redirectOnDelete }: { postid: string, redirectOnDelete: boolean}) => {
    const navigate = useNavigate(); 
    const { deletePost } = useBlogPosts();

    //Skicka användare till edit-sida 
    const editPost = () => {
        navigate(`/edit/${postid}`);
    }

    //Ta bort inlägg
    const removePost = async () => {
        await deletePost(postid);

        //Omdirigera?
        if(redirectOnDelete === true) {
            navigate("/");
        }
    }

  return (
    <div className="post-controls">
        <button onClick={editPost}>Redigera</button>
        <button onClick={removePost}>Ta bort</button>
    </div>
  )
}

export default PostControls