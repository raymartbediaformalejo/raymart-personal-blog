import { useEffect, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import SearchForm from "../../components/SearchForm";
import { MAIN_NAVIGATION_ITEMS, POST_QUERY_KEYS } from "../../utils/Constant";
import classes from "../../styles/pages/articles/Articles.module.css";
import { useLazySearchPostQuery } from "../../redux/posts/posts.api";
import ArticleCard from "./components/ArticleCard";
import ArticleTagOptions from "./components/ArticleTagOptions";
const Articles = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(POST_QUERY_KEYS.QUERY) || "";
  const page = searchParams.get(POST_QUERY_KEYS.PAGE) || "1";
  const sort = searchParams.get(POST_QUERY_KEYS.SORT) || `[]`;
  const tag = searchParams.get(POST_QUERY_KEYS.TAG) || `["All"]`;

  const defferedQuery = useDeferredValue(q);
  console.log(tag);

  let articlesContent;

  useEffect(() => {
    console.log("eme");

    // if (defferedQuery) {
    searchPosts({
      q: defferedQuery,
      tag: JSON.parse(tag),
      sort: JSON.parse(sort),
      page: +page,
    });
    // }
  }, [searchPosts, defferedQuery, tag, sort, page]);

  console.log("posts: ", posts);

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
        No result to {`"${defferedQuery}"`}
      </p>
    );
  }

  return (
    <div className="container">
      <h1 className={classes["title"]}>
        {MAIN_NAVIGATION_ITEMS.ARTICLES.name}
      </h1>

      <SearchForm q={defferedQuery} setSearchParams={setSearchParams} />

      <ArticleTagOptions />
      {articlesContent}
    </div>
  );
};

export default Articles;
