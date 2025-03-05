import { useBlogPosts } from "../context/PostContext";

const HomePage = () => {

  //Hämta states från context
  const { posts, loading, error } = useBlogPosts();

  //Välj ut senaste inläggen
  const latestFivePosts = posts.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime()).slice(0, 5); 

  return (
    <>
      <h1>The Good Blog</h1>
      <h2>Senaste inläggen</h2>
      {loading && <p>Laddar inlägg...</p>}
      {error && <p>{error}</p>}

      {latestFivePosts.map(post => (
        <article key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Publicerat: {new Date(post.posted).toLocaleString()}</p>
        </article>
      ))}
    </>
  )
}

export default HomePage