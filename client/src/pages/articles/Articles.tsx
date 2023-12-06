import { useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import CheckboxTag from "../../components/CheckboxTag";
import { MAIN_NAVIGATION_ITEMS } from "../../utils/Constant";
import classes from "../../styles/pages/articles/Articles.module.css";
import { useLazySearchPostQuery } from "../../redux/posts/posts.api";
import ArticleCard from "./components/ArticleCard";
import ArticleTagOptions from "./components/ArticleTagOptions";
const Articles = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  useEffect(() => {
    searchPosts({
      q: "Inheritance",
      tag: ["65642b73fb695419c0df9e89"],
      sort: ["createdAt"],
      page: 1,
    });
  }, [searchPosts]);

  console.log(posts);

  return (
    <div className="container">
      <h1 className={classes["title"]}>
        {MAIN_NAVIGATION_ITEMS.ARTICLES.name}
      </h1>
      <SearchForm />
      <ArticleTagOptions />
      <section className={classes["article-section"]}>
        {posts?.posts.map((post) => (
          <ArticleCard key={post._id} postId={post._id} />
        ))}
      </section>
    </div>
  );
};

export default Articles;
