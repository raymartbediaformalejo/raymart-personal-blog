import { useState } from "react";
import { Tooltip, TooltipProps } from "@mui/material";

const ManagedTooltip = (props: TooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ height: "100%" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(false)}
    >
      <Tooltip
        {...props}
        open={open}
        disableFocusListener
        disableHoverListener
      />
    </div>
  );
};

export default ManagedTooltip;
