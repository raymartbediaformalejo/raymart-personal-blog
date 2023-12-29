import { SVGProps } from "react";

import classes from "../../styles/component/icons/CircelIcon.module.css";

const ArrowLongIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="0.875rem"
      height="0.875rem"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${classes["circle-icon"]} ${
        props.className ? props.className : ""
      }`}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      ></path>
    </svg>
  );
};

export default ArrowLongIcon;
