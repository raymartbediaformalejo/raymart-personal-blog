import SearchIcon from "./icons/SearchIcon";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";
import classes from "../styles/component/SearchForm.module.css";

const SearchForm = () => {
  return (
    <div className={classes["search-form-wrapper"]}>
      <form className={classes["search-form"]}>
        <input
          type="text"
          placeholder="Search"
          className={classes["search-form__input"]}
        />
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
