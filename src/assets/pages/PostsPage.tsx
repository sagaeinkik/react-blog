import { useBlogPosts } from "../context/PostContext"; 
import { useAuth } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import "../scss/_PostsPage.scss";
import Divider from "../images/divider.svg"
import PostControls from "../components/PostControls"

const PostsPage = () => {
  //States
  const { posts, loading, error } = useBlogPosts();
  const { isAuthenticated } = useAuth();

  //Text-stympar-funktion
  const truncateContent = (content: string) => {
    if(content.length > 100) {
      return content.slice(0, 100) + "...";
    } else {
      return content; 
    }
  }

  return (
    <div className="page-wrap">
      <h2>Alla inlägg</h2>
      {loading && <p>Laddar...</p>}
      {error && <p className="error">{error}</p>}

      
      <ul className="blog-list">
      {posts.map(post => (
        <li key={post._id}>
          <NavLink to={`/post/${post._id}`}>
          <p className="title">{post.title}</p>
          <p className="truncated">{truncateContent(post.content)}</p>
          </NavLink>
          {isAuthenticated && <PostControls postid={post._id} redirectOnDelete={false}/>}
          <img src={Divider} alt="Divider" />
      </li>
      ))}
      </ul>
    </div>
  )
}

export default PostsPage