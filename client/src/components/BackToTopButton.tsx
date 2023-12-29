import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";

import classes from "../styles/component/BackToTopButton.module.css";
import ArrowLongIcon from "./icons/ArrowLongIcon";
import ManagedTooltip from "./ui/ManagedTooltip";
const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  console.log("showButton: ", showButton);

  useEffect(() => {
    const checkScrollHeight = () => {
      const scrollPosition = window.scrollY;
      if (!showButton && scrollPosition > 400) {
        setShowButton(true);
      } else if (showButton && scrollPosition <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, [showButton]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ManagedTooltip title="Back to top">
      <IconButton
        className={`${classes["back-to-top-button"]} ${
          showButton ? classes["show"] : ""
        }`}
        onClick={handleScrollToTop}
      >
        <ArrowLongIcon className={classes["arrow"]} />
      </IconButton>
    </ManagedTooltip>
  );
};

export default BackToTopButton;
