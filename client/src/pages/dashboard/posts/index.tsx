import React, { useEffect } from "react";

import { useLazySearchPostQuery } from "../../../redux/posts/posts.api";
import EnhancedTable from "./components/EnhancedTable";

const Posts = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  let content;
  useEffect(() => {
    searchPosts({
      limit: 10,
    });
  }, [searchPosts]);

  console.log("posts: ", posts);
  if (posts) {
    content = <EnhancedTable rows={posts.posts} />;
  } else {
    content = <p>Loading...</p>;
  }
  return content;
};

export default Posts;
