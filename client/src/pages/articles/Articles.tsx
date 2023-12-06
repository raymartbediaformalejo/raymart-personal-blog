import { useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import CheckboxTag from "../../components/CheckboxTag";
import { MAIN_NAVIGATION_ITEMS } from "../../utils/Constant";
import classes from "../../styles/pages/articles/Articles.module.css";
import { useLazySearchPostQuery } from "../../redux/posts/posts.api";
const Articles = () => {
  const [searchPosts, { data }] = useLazySearchPostQuery();
  useEffect(() => {
    searchPosts({
      q: "Inheritance",
      tag: ["65642b73fb695419c0df9e89"],
      sort: ["createdAt", "desc"],
    });
  }, [searchPosts]);

  console.log(data);

  return (
    <>
      <h1 className={classes["title"]}>
        {MAIN_NAVIGATION_ITEMS.ARTICLES.name}
      </h1>
      <SearchForm />
      <div className={classes["tags"]}>
        <CheckboxTag tag={"JavaScript"} tagCount={21} />
        <CheckboxTag tag={"React"} tagCount={21} />
        <CheckboxTag tag={"CSS"} tagCount={1} />
        <CheckboxTag tag={"NodeJS"} tagCount={2} />
        <CheckboxTag tag={"HTML"} tagCount={12} />
        <CheckboxTag tag={"Database"} tagCount={5} />
      </div>
    </>
  );
};

export default Articles;
