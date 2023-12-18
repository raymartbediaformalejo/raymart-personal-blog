import { useEffect, useDeferredValue } from "react";

import { useLazySearchPostQuery } from "../../../redux/posts/posts.api";
import EnhancedTable from "./components/EnhancedTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { POST_QUERY_KEYS } from "../../../utils/Constant";
import { TSortBy } from "../../../types/types";
import { Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import classes from "../../../styles/pages/dashboard/Articles.module.css";

const Posts = () => {
  const [searchPosts, { data: posts }] = useLazySearchPostQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(POST_QUERY_KEYS.QUERY) || "";
  const page = searchParams.get(POST_QUERY_KEYS.PAGE) || "1";
  const postLimit = searchParams.get(POST_QUERY_KEYS.LIMIT) || "5";
  const sort = searchParams.get(POST_QUERY_KEYS.SORT) || `["createdAt", "asc"]`;
  const tag =
    decodeURIComponent(searchParams.get(POST_QUERY_KEYS.TAG) + "") || `["All"]`;
  // const [tagOptions, setTagOptions] = useState<string[]>([]);
  const defferedQuery = useDeferredValue(q);
  const sortBy: TSortBy = {
    sortBy: JSON.parse(sort)[0],
    order: JSON.parse(sort)[1],
  };
  const navigate = useNavigate();

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
  const handleGoToAddPost = () => {
    navigate("/dashboard/articles/new");
  };
  if (posts) {
    content = (
      <>
        <div className={classes["add-new-post-button-wrapper"]}>
          <Button
            className={classes["add-new-post-button"]}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleGoToAddPost}
            size="small"
          >
            <span className={classes["add-new-post-button__label"]}>
              Add new post
            </span>
          </Button>
        </div>
        <EnhancedTable
          query={q}
          rows={posts.posts}
          page={+page}
          sort={sortBy}
          rowsPerPage={+postLimit}
          totalPosts={posts.total}
          setSearchParams={setSearchParams}
        />
      </>
    );
  } else {
    content = (
      <div className="loading-wrapper">
        <CircularProgress size="3rem" />
      </div>
    );
  }
  return <div className="container__large">{content}</div>;
};

export default Posts;
