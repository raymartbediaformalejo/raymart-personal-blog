import { SVGProps } from "react";

import classes from "../../styles/component/icons/XIcon.module.css";

const XIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currenColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={classes["x-icon"]}
    >
      <path d="M2.75 2.04297L2.04297 2.75L2.39844 3.10156L7.29297 8L2.04297 13.25L2.75 13.957L8 8.70703L12.8945 13.6055L13.25 13.957L13.957 13.25L13.6055 12.8945L8.70703 8L13.957 2.75L13.25 2.04297L8 7.29297L3.10156 2.39844L2.75 2.04297Z" />
    </svg>
  );
};

export default XIcon;
