import { SVGProps } from "react";
import classes from "../../styles/component/icons/CircelIcon.module.css";

const MoonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={classes["circle-icon"]}
      {...props}
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
  );
};

export default MoonIcon;
