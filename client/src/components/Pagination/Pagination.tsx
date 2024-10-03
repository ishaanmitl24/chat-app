import React from "react";
import classes from "../Pagination/Pagination.module.css";
import { Icon } from "@iconify/react";

const Pagination: React.FC<{
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  const { page = 1, pages = 5, setPage } = props;

  const pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push({ id: i, pageNo: i });
  }

  const prevPageHandle = () => {
    if (page === 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  const nextPageHandle = () => {
    if (page === pages) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  return (
    <div className={classes.main}>
      <button onClick={prevPageHandle} className={classes.item}>
        <Icon
          style={{ fontSize: "25px", color: "rgba(0,0,0,0.77)" }}
          icon="material-symbols:arrow-back-2"
        />
      </button>
      <div className={classes["items-arr"]}>
        {pages &&
          pagesArr.map((item) => (
            <button
              onClick={() => {
                setPage(item.pageNo);
              }}
              className={`${classes.item} ${
                page === item.pageNo
                  ? classes["item-selected"]
                  : classes["item-not-selected"]
              }`}
            >
              {item.pageNo}
            </button>
          ))}
      </div>
      <button onClick={nextPageHandle} className={classes.item}>
        <Icon
          style={{ fontSize: "25px", color: "rgba(0,0,0,0.77)" }}
          icon="material-symbols:play-arrow"
        />
      </button>
    </div>
  );
};

export default Pagination;
