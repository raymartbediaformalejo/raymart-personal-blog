import { SVGProps } from "react";
import classes from "../../styles/component/icons/ArrowIcon.module.css";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  variant?: "head" | "headtail";
  size?: "small" | "medium" | "large";
};
const ArrrowIcon = ({ size = "medium", className }: ArrowIconProps) => {
  let content;

  if (size === "large") {
    content = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={`${className ? className : ""}`}
      >
        <path
          fillRule="evenodd"
          d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  } else {
    content = (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden={true}
        className={classes["arrow"]}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        ></path>
      </svg>
    );
  }

  return content;
};

export default ArrrowIcon;
