import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postsUrl } from "../common/constants";
import { IPost } from "../types/posts";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (id) {
      fetch(`${postsUrl}/${id}`)
        .then((resp) => resp.json())
        .then((json) => setPost(json))
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <>
      <h1>Post № {id}</h1>
      <h3>{post?.title}</h3>
      <p>{post?.body}</p>
    </>
  );
}
