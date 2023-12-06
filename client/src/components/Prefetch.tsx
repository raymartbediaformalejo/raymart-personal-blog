import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { store } from "../redux";
import { postsApi } from "../redux/posts/posts.api";
import { categoryApi } from "../redux/categories/categories.api";
import { tagsApi } from "../redux/tags/tags.api";

const Prefetch = () => {
  useEffect(() => {
    const post = store.dispatch(postsApi.endpoints.getPosts.initiate());
    const categories = store.dispatch(
      categoryApi.endpoints.getCategories.initiate()
    );
    const tags = store.dispatch(tagsApi.endpoints.getTags.initiate());
    console.log("post: ", post);
    console.log("categories: ", categories);
    console.log("tags: ", tags);

    return () => {
      post.unsubscribe();
      categories.unsubscribe();
      tags.unsubscribe();
    };
  });
  return <Outlet />;
};

export default Prefetch;
