import React, { useState, useRef, useEffect } from "react";
import classes from "../../styles/component/ui/Tooltip.module.css";

type TooltipProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  delay?: number;
  text: string;
};

const windowWidth = window.innerWidth;

const Tooltip = ({ text, delay = 400, children, className }: TooltipProps) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleShowTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const handleHideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };
  const calculateTooltipPosition = () => {
    if (tooltipRef.current) {
      const buttonRect =
        tooltipRef.current.parentElement?.getBoundingClientRect();

      const childeRect = tooltipRef.current.getBoundingClientRect();
      if (buttonRect) {
        const parentCenterX = buttonRect.left + buttonRect.width / 2;
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const tooltipVerticalPosition = buttonRect.y + 44;
        // Calculate the left position to center the tooltip
        const tooltipPosition = parentCenterX - tooltipWidth / 2;

        const overflowToLeft = tooltipPosition < 0;
        // const overflowToRight =
        //   windowWidth - (tooltipPosition + tooltipWidth) < 0;
        const overflowToRight =
          windowWidth - (childeRect.x + childeRect.width) < 50;

        let tooltipStyle = {};

        if (overflowToRight) {
          // If overflow to the right, position to the right of the parent
          tooltipStyle = {
            transform: `translate3d(${
              buttonRect.width - tooltipWidth + buttonRect.x + 2
            }px, ${tooltipVerticalPosition}px, 0)`,
          };
        } else if (overflowToLeft) {
          // If overflow to the left, position to the left of the parent
          tooltipStyle = {
            transform: `translate3d(${buttonRect.left}px, ${tooltipVerticalPosition}px, 0)`,
          };
        } else {
          // No overflow, use the original position
          tooltipStyle = {
            transform: `translate3d(${tooltipPosition}px, ${tooltipVerticalPosition}px, 0)`,
          };
        }

        setTooltipStyle(tooltipStyle);
      }
    }
  };

  useEffect(() => {
    calculateTooltipPosition();
  }, [active]);

  return (
    <div
      className={`${classes["tooltip-wrapper"]} ${className ? className : ""}`}
      onMouseEnter={() => {
        handleShowTip();
        calculateTooltipPosition();
      }}
      onMouseLeave={handleHideTip}
    >
      {children}
      {active && (
        <div
          ref={tooltipRef}
          className={classes["tooltip"]}
          style={tooltipStyle}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
