import { useBlogPosts } from "../context/PostContext";
import { useAuth } from "../context/UserContext";
import Divider from "../images/divider.svg";
import SideNav from "../components/SideNav";
import PostControls from "../components/PostControls"
import "../scss/_HomePage.scss"

const HomePage = () => {

  //Hämta states från context
  const { posts, loading, error } = useBlogPosts();
  const { isAuthenticated } = useAuth();

  //Välj ut senaste inläggen
  const latestFivePosts = posts.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime()).slice(0, 5); 

  return (
    <>
      <div className="fp-grid-wrap">
      <div className="posts-container">

      <h2>Senaste inläggen</h2>
      {loading && <p>Laddar...</p>}
      {error && <p className="error">{error}</p>}

      {latestFivePosts.map(post => (
        <article key={post._id} className="post">
          <h3>{post.title}</h3>
          <p className="content">{post.content}</p>
          <p className="posted">Publicerat: {new Date(post.posted).toLocaleString()}</p>
          {isAuthenticated && <PostControls postid={post._id} redirectOnDelete={false}/>}
        <img src={Divider} alt="Avskiljare" />
        </article>
      ))}
      </div> {/* Slut på posts-container */}
      <SideNav />
      </div> {/* Slut på fp-grid-wrap */}
    </>
  )
}

export default HomePage