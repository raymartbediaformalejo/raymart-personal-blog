import React from "react";
import SearchForm from "../../components/SearchForm";
import CheckboxTag from "../../components/CheckboxTag";
import { MAIN_NAVIGATION_ITEMS } from "../../utils/Constant";
import classes from "../../styles/pages/articles/Articles.module.css";
const Articles = () => {
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
