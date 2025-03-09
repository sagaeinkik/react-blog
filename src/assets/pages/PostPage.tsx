import { useParams, NavLink } from "react-router-dom";
import { useBlogPosts } from "../context/PostContext";
import { useAuth } from "../context/UserContext";
import PostControls from "../components/PostControls"

const PostPage = () => {
  //States från context
  const { posts, loading, error } = useBlogPosts();
  const { isAuthenticated } = useAuth();
  
  //Hämta ID ur url 
  const { id } = useParams<{ id: string }>();

  //Hitta rätt inlägg
  const post = posts.find(post => String(post._id) === id);

  //If/else för att visa laddning, fel eller inlägg
  const displayText = () => {
    if(loading) {
      return <p>Laddar...</p>
    } else if (error) {
      return <p className="error">{error}</p>
    } else if (!post) {
      return <p>Inlägget kunde inte hittas</p>
    } else {
      return (<div className="post"><h2>{post.title}</h2>
        <p className="content">{post.content}</p>
        <p className="posted">Publicerat: {new Date(post.posted).toLocaleString()}</p>
        {isAuthenticated && <PostControls postid={post._id} redirectOnDelete={true}/>}
        </div>
      ) 
    }
  }

  return (
    <div className="page-wrap">
      <NavLink to="/posts">Se alla inlägg</NavLink>
      {displayText()}
    </div>
  )
}

export default PostPage