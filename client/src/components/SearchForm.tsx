import { SetURLSearchParams } from "react-router-dom";

import SearchIcon from "./icons/SearchIcon";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";
import classes from "../styles/component/SearchForm.module.css";
import { POST_QUERY_KEYS } from "../utils/Constant";
import XIcon from "./icons/XIcon";

type SearchFormProps = {
  q: string | null;
  setSearchParams: SetURLSearchParams;
};
const SearchForm = ({ q, setSearchParams }: SearchFormProps) => {
  const handleDeleteQuery = () => {
    setSearchParams((prev) => {
      prev.delete(POST_QUERY_KEYS.QUERY);
      return prev;
    });
  };
  return (
    <div className={classes["search-form-wrapper"]}>
      <form className={classes["search-form"]}>
        <input
          type="text"
          placeholder="Search title..."
          value={q ?? ""}
          onChange={(e) => {
            setSearchParams((prev) => {
              prev.set("q", e.target.value);
              return prev;
            });
          }}
          className={classes["search-form__input"]}
        />
        {q && q.length && (
          <Button
            className={classes["delete-icon"]}
            variant="icon"
            onClick={handleDeleteQuery}
          >
            <XIcon />
          </Button>
        )}
      </form>
      <div className={classes["search-button-wrapper"]}>
        <Tooltip text="Search" className={classes["tooltip"]}>
          <Button
            className={classes["search-button"]}
            variant="transparent"
            noHover
          >
            <SearchIcon className={classes["search-icon"]} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SearchForm;
