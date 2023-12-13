import { useState, useEffect, useDeferredValue } from "react";

import { useLazySearchPostQuery } from "../../../redux/posts/posts.api";
import EnhancedTable from "./components/EnhancedTable";
import { useSearchParams } from "react-router-dom";
import { POST_QUERY_KEYS } from "../../../utils/Constant";

const Posts = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(POST_QUERY_KEYS.QUERY) || "";
  const page = searchParams.get(POST_QUERY_KEYS.PAGE) || "1";
  const postLimit = searchParams.get("limit") || "5";
  const sort = searchParams.get(POST_QUERY_KEYS.SORT) || `[]`;
  const tag =
    decodeURIComponent(searchParams.get(POST_QUERY_KEYS.TAG) + "") || `["All"]`;
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const defferedQuery = useDeferredValue(q);
  const start = (+page - 1) * +postLimit;
  const end = start + +postLimit;
  const postLength = posts?.total;

  let articlesContent;

  let content;
  useEffect(() => {
    searchPosts({
      q: defferedQuery,
      tag: JSON.parse(tag),
      sort: JSON.parse(sort),
      page: +page,
      limit: +postLimit,
    });
  }, [searchPosts, defferedQuery, tag, sort, page, postLimit]);

  console.log("posts: ", posts);
  if (posts) {
    content = (
      <EnhancedTable
        query={q}
        rows={posts.posts}
        setSearchParams={setSearchParams}
      />
    );
  } else {
    content = <p>Loading...</p>;
  }
  return content;
};

export default Posts;
