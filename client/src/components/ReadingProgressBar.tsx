import React, { useState, useEffect } from "react";

import classes from "../styles/component/ReadingProgressBar.module.css";

type ReadingProgressBarProps = {
  target?: React.RefObject<HTMLDivElement>;
};
const ReadingProgressBar = ({ target }: ReadingProgressBarProps) => {
  console.log("target: ", target);

  const [barWidth, setBarWidth] = useState(0);

  const scrollListener = () => {
    if (!target || !target.current) {
      return;
    } else {
      const element = target.current;
      const totalHeight =
        element.clientHeight - element.offsetTop - window.innerHeight;
      const windowScrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (windowScrollTop === 0) {
        return setBarWidth(0);
      }

      if (windowScrollTop > totalHeight) {
        return setBarWidth(100);
      }

      setBarWidth((windowScrollTop / totalHeight) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      className={classes["progress-bar"]}
      style={{ width: `${barWidth}%` }}
    />
  );
};

export default ReadingProgressBar;
