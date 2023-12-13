import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import classes from "../../../../styles/pages/dashboard/table/EnhanceTableToolbar.module.css";

type EnhancedTableToolbarProps = {
  numSelected: number;
};
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        padding: "1.3rem 1rem",
        borderBottom: "1px solid hsla(0 0% 100% / 0.1)",
        pl: { sm: 4 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Posts
        </Typography>
      )}
      <FormControl>
        <TextField
          className={classes["search-field"]}
          size="small"
          variant="outlined"
          // onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment
                className={classes["search-icon"]}
                position="start"
              >
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                className={classes["delete-icon"]}
                // style={{ display: showClearIcon }}
                // onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
