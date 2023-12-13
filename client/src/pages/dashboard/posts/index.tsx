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
  const postLimit = searchParams.get(POST_QUERY_KEYS.LIMIT) || "5";
  const sort = searchParams.get(POST_QUERY_KEYS.SORT) || `[]`;
  const tag =
    decodeURIComponent(searchParams.get(POST_QUERY_KEYS.TAG) + "") || `["All"]`;
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const defferedQuery = useDeferredValue(q);
  const start = (+page - 1) * +postLimit;
  const end = start + +postLimit;
  const postLength = posts?.total;

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
  console.log("page: ", page);
  if (posts) {
    content = (
      <EnhancedTable
        query={q}
        rows={posts.posts}
        page={+page}
        rowsPerPage={+postLimit}
        totalPosts={posts.total}
        setSearchParams={setSearchParams}
      />
    );
  } else {
    content = <p>Loading...</p>;
  }
  return content;
};

export default Posts;
