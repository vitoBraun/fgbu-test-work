import { useCallback, useEffect, useMemo, useState } from "react";
import { IPost } from "../types/posts";
import useCallbackOnScrolldown from "../common/useCallbackOnScrolldown";
import { useNavigate } from "react-router-dom";
import { postsAmount, postsUrl } from "../common/constants";

export default function usePosts() {
  const [allPosts, setAllPosts] = useState<IPost[]>();
  const [postsByPortions, setPostsByPortions] = useState<IPost[]>();
  const [portionsMaxAmount, setPortionsMaxAmount] = useState(0);

  const initialPortionIndex = useMemo(() => {
    return Number(new URLSearchParams(window.location.search).get("portions"));
  }, []);

  const [portionIndex, setPortionIndex] = useState(initialPortionIndex);

  const navigate = useNavigate();

  const nextPortion = useCallback(() => {
    if (portionIndex + 1 <= portionsMaxAmount) {
      setPortionIndex(portionIndex + 1);
    }
  }, [portionIndex, portionsMaxAmount, setPortionIndex]);

  useCallbackOnScrolldown(() => {
    if (portionIndex < 5) {
      nextPortion();
    }
  });

  const handlePostClick = useCallback(
    (postId: number) => {
      navigate(`/posts/${postId}`);
    },
    [navigate]
  );

  //Loading all posts
  useEffect(() => {
    fetch(postsUrl)
      .then((resp) => resp.json())
      .then((json) => {
        setAllPosts(json);
        setPortionsMaxAmount(json.length / postsAmount);
      })
      .catch((err) => console.log(err));
  }, []);

  //Setting post portions
  useEffect(() => {
    if (allPosts?.length && portionIndex) {
      window.history.pushState(null, "", `?portions=${portionIndex}`);
      setPostsByPortions(allPosts.slice(0, Number(portionIndex) * postsAmount));
    }
  }, [allPosts, portionIndex]);

  return {
    postsByPortions,
    setPortionIndex,
    portionIndex,
    portionsMaxAmount,
    handlePostClick,
    nextPortion,
  };
}
