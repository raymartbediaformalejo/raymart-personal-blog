import { SVGProps } from "react";
import classes from "../../styles/component/icons/ArrowIcon.module.css";
const ArrrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden={true}
      className={classes["arrow"]}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      ></path>
    </svg>
  );
};

export default ArrrowIcon;
