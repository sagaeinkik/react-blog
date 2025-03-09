import { useBlogPosts } from "../context/PostContext";
import "../scss/_HomePage.scss";
import {NavLink} from "react-router-dom"

const SideNav = () => {
    const { posts, loading, error } = useBlogPosts();

    let tenMorePosts;

    if(posts.length > 5) {
        tenMorePosts = posts.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime()).slice(5, 10);
    } else {
        tenMorePosts = posts.sort((a, b) => new Date (b.posted).getTime() - new Date (a.posted).getTime()).slice(0, 10);
    }

  return (
    <div className="sideNav">
        <h2>Fler inlägg</h2>
        {loading && <p>Laddar...</p>}
        {error && <p>{error}</p>}
        <nav>
        <ul>
        {tenMorePosts.map(post => (
            <li key={post._id}>
            <NavLink to={`/post/${post._id}`}>
                {post.title}
            </NavLink>
            </li>
        ))}
        </ul>
        </nav>
    </div>
  )
}

export default SideNav