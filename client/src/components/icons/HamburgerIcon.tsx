import { SVGProps } from "react";
import classes from "../../styles/component/icons/CircelIcon.module.css";

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      className={classes["circle-icon"]}
      // className="h-4 w-4 text-gray-600 dark:text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16m-7 6h7"
      ></path>
    </svg>
  );
};

export default HamburgerIcon;
