import Post from "./Post";
import usePosts from "./usePosts";
import styles from "./Post.module.css";

export default function PostList() {
  const {
    postsByPortions,
    portionIndex,
    portionsMaxAmount,
    handlePostClick,
    nextPortion,
  } = usePosts();

  return (
    <div className={styles.postsPage}>
      <div className={styles.postList}>
        {postsByPortions?.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            title={post.title}
            body={post.body}
            onPostClick={handlePostClick}
          />
        ))}
        {portionIndex >= 5 && portionIndex < portionsMaxAmount && (
          <button className={styles.loadButton} onClick={nextPortion}>
            Загрузить ещё
          </button>
        )}
        <div id="sentinel" style={{ height: "15px" }} />
      </div>
    </div>
  );
}
