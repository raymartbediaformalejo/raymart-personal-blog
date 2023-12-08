import { SetURLSearchParams } from "react-router-dom";
import classes from "../styles/component/Pagination.module.css";
import { getPages } from "../utils/utils";
import ArrrowIcon from "./icons/ArrrowIcon";

type PaginationProps = {
  activePage: string;
  total?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setSearchParams: SetURLSearchParams;
};

const Pagination = ({
  total,
  activePage,
  setSearchParams,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const pages = getPages(total!);

  const handleSetActivePage = (page: string) => {
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };

  const handleNextPageClick = () => {
    const nextPage = parseInt(activePage) + 1;
    setSearchParams((prev) => {
      prev.set("page", nextPage.toString());
      return prev;
    });
  };

  const handlePrevPageClick = () => {
    const prevPage = parseInt(activePage) - 1;
    setSearchParams((prev) => {
      prev.set("page", prevPage.toString());
      return prev;
    });
  };

  console.log("hasNextPage: ", hasNextPage);

  return (
    <div className={classes["pagination-container"]}>
      <div className={classes["pagination"]}>
        <button
          onClick={handlePrevPageClick}
          className={`${classes["prev-button"]} ${
            hasPrevPage ? classes["has-page"] : ""
          } `}
          disabled={!hasPrevPage}
        >
          <ArrrowIcon />
        </button>
        {pages &&
          pages.map((page, i) => (
            <button
              key={page}
              className={`${classes["pagination-number"]} ${
                activePage === page ? classes.active : ""
              } `}
              onClick={() => handleSetActivePage(page)}
              onKeyDown={() => handleSetActivePage(page)}
              role="button"
              tabIndex={i}
            >
              {page}
            </button>
          ))}
        <button
          onClick={handleNextPageClick}
          className={`${classes["next-button"]} ${
            hasPrevPage ? classes["has-page"] : ""
          }`}
          disabled={!hasNextPage}
        >
          <ArrrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
