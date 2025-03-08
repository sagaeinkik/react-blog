import { useBlogPosts } from "../context/PostContext"; 
import { NavLink } from "react-router-dom";
import "../scss/_PostsPage.scss";
import Divider from "../images/divider.svg"

const PostsPage = () => {
  //States
  const { posts, loading, error } = useBlogPosts();

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
      {loading && <p>Laddar inlägg...</p>}
      {error && <p>{error}</p>}

      
      <ul className="blog-list">
      {posts.map(post => (
        <li key={post._id}>
          <NavLink to={`/post/${post._id}`}>
          <p className="title">{post.title}</p>
          <p className="truncated">{truncateContent(post.content)}</p>
          </NavLink>
          <img src={Divider} alt="Divider" />
      </li>
      ))}
      </ul>
    </div>
  )
}

export default PostsPage