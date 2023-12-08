import { useState, useEffect, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import SearchForm from "../../components/SearchForm";
import {
  MAIN_NAVIGATION_ITEMS,
  POSTS_LIMIT,
  POST_QUERY_KEYS,
} from "../../utils/Constant";
import classes from "../../styles/pages/articles/Articles.module.css";
import { useLazySearchPostQuery } from "../../redux/posts/posts.api";
import ArticleCard from "./components/ArticleCard";
import ArticleTagOptions from "./components/ArticleTagOptions";
import Pagination from "../../components/Pagination";
const Articles = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(POST_QUERY_KEYS.QUERY) || "";
  const page = searchParams.get(POST_QUERY_KEYS.PAGE) || "1";
  const sort = searchParams.get(POST_QUERY_KEYS.SORT) || `[]`;
  const tag =
    decodeURIComponent(searchParams.get(POST_QUERY_KEYS.TAG) + "") || `["All"]`;
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const defferedQuery = useDeferredValue(q);
  const start = (+page - 1) * POSTS_LIMIT;
  const end = start + POSTS_LIMIT;
  const postLength = posts?.total;

  let articlesContent;

  console.log("start: ", start);
  console.log("end: ", end);
  console.log("postLength: ", postLength);

  useEffect(() => {
    searchPosts({
      q: defferedQuery,
      tag: JSON.parse(tag),
      sort: JSON.parse(sort),
      page: +page,
    });

    if (posts?.total && !posts.posts.length) {
      setSearchParams((prev) => {
        prev.set(POST_QUERY_KEYS.PAGE, "1");
        return prev;
      });
    }
  }, [
    searchPosts,
    defferedQuery,
    tag,
    sort,
    page,
    tagOptions,
    posts?.total,
    posts?.posts,
    setSearchParams,
  ]);

  console.log("posts: ", posts);
  console.log("postLength: ", postLength);

  console.log("postLength: ", posts && Math.ceil(posts.total / POSTS_LIMIT));

  if (posts?.posts && posts.posts.length > 0) {
    articlesContent = (
      <section className={classes["article-section"]}>
        {posts?.posts.map((post) => (
          <ArticleCard key={post._id} postId={post._id} />
        ))}
      </section>
    );
  } else {
    articlesContent = (
      <p className={classes["no-result"]}>
        No result {` ${defferedQuery ? `to ${`"${defferedQuery}"`}` : ""}`}
      </p>
    );
  }

  return (
    <div className="container">
      <h1 className={classes["title"]}>
        {MAIN_NAVIGATION_ITEMS.ARTICLES.name}
      </h1>

      <SearchForm q={defferedQuery} setSearchParams={setSearchParams} />

      <ArticleTagOptions
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
        setSearchParams={setSearchParams}
      />
      {articlesContent}

      {!!postLength && !!(Math.ceil(posts.total / POSTS_LIMIT) > 1) && (
        <Pagination
          activePage={page}
          hasNextPage={end < postLength}
          hasPrevPage={start > 0}
          total={posts?.total}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
};

export default Articles;
