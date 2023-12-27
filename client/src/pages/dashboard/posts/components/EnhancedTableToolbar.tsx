import React, { useState } from "react";
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
import { SetURLSearchParams } from "react-router-dom";

import classes from "../../../../styles/pages/dashboard/table/EnhanceTableToolbar.module.css";
import { POST_QUERY_KEYS } from "../../../../utils/Constant";
// import { useDeletePostMutation } from "../../../../redux/posts/posts.api";
import PostDeleteModal from "../../../../components/ui/Modals/PostDeleteModal";

type EnhancedTableToolbarProps = {
  query: string | null;
  selected: string[];
  setSearchParams: SetURLSearchParams;
};
const EnhancedTableToolbar = ({
  query,
  selected,
  setSearchParams,
}: EnhancedTableToolbarProps) => {
  const [open, setOpen] = useState(false);
  const numSelected = selected.length;
  // const [deletePost, { isLoading }] = useDeletePostMutation();
  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchParams((prev) => {
      prev.set(POST_QUERY_KEYS.QUERY, e.target.value);
      return prev;
    });
  };

  const handleClearQuery = () => {
    setSearchParams((prev) => {
      prev.delete(POST_QUERY_KEYS.QUERY);
      return prev;
    });
  };

  // const handleDeletePosts = async () => {
  //   await deletePost(selected);
  //   setOpen(false);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PostDeleteModal
        open={open}
        onClose={handleClose}
        selectedItem={selected}
        // isLoading={isLoading}
        // onDelete={handleDeletePosts}
      />
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
            onChange={handleChangeSearch}
            value={query ?? ""}
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
                  className={`${classes["delete-icon"]} ${
                    query && query.length > 0 ? classes["show"] : ""
                  }`}
                  onClick={handleClearQuery}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleOpen}>
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
    </>
  );
};

export default EnhancedTableToolbar;
