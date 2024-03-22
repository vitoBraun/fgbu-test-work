import styles from "./Post.module.css";

type PostProps = {
  title: string;
  body: string;
  postId: number;
  onPostClick: (id: number) => void;
} & React.AllHTMLAttributes<HTMLDivElement>;

export default function Post({ onPostClick, title, body, postId }: PostProps) {
  return (
    <div className={styles.post} onClick={() => onPostClick(postId)}>
      <h2 className={styles.postTitle}>{title}</h2>
      <p className={styles.postBody}>{body}</p>
    </div>
  );
}
