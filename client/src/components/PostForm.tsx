import React, { Suspense, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CircularProgress, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import classes from "../styles/component/PostForm.module.css";
import { TPostResponse } from "../redux/posts/posts.type";
import { postSchemaWithId } from "../redux/posts/posts.schema";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectAllCategories } from "../redux/categories/categories.api";
import { selectAllTags } from "../redux/tags/tags.api";
import { QUILL_EDITOR_FORMATS, QUILL_EDITOR_MODULES } from "../utils/Constant";
import { TOption } from "../types/types";
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../redux/posts/posts.api";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

type PostFormProps = {
  postToEdit?: TPostResponse;
};

const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);

const PostForm = ({ postToEdit }: PostFormProps) => {
  const { showBoundary } = useErrorBoundary();
  const { handleSubmit, control, watch, setValue, reset } =
    useForm<TPostResponse>({
      shouldFocusError: false,
      defaultValues: {
        _id: "",
        author: "6572f6f8a582516575637ceb",
        category: [],
        tag: [],
        title: "",
        summary: "",
        image: "",
        content: "",
        status: "",
        visibility: "",
        featured: false,
      },
      resolver: zodResolver(postSchemaWithId),
    });
  const [
    addPost,
    { isSuccess: isSuccessAdd, isError: isErrorAdd, error: errorAdd },
  ] = useAddNewPostMutation();
  const [
    updatePost,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdatePostMutation();
  const categories = useAppSelector(selectAllCategories);
  const tags = useAppSelector(selectAllTags);
  const formData: FormData = new FormData();
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));
  const navigate = useNavigate();

  const tagOptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
    id: `${tag._id}-${tag.name}`,
  }));
  const visibilityOptions: TOption[] = [
    { value: "Public", label: "Public" },
    { value: "Private", label: "Private" },
  ];
  const statusOptions: TOption[] = [
    { value: "Draft", label: "Draft" },
    { value: "Published", label: "Published" },
  ];

  const onSubmit = async (data: TPostResponse) => {
    try {
      if (postToEdit) {
        await updatePost({ ...data });
      } else {
        await addPost({
          author: data.author,
          category: data.category,
          tag: data.tag,
          title: data.title,
          summary: data.summary,
          content: data.content,
          image: data.image,
          status: data.status,
          visibility: data.visibility,
          featured: data.featured,
        });
      }
      reset();
    } catch (error) {
      showBoundary(error);
    }
  };

  if (postToEdit) {
    if (isErrorUpdate) {
      console.log(errorUpdate);
    }

    if (isSuccessUpdate) {
      console.log("Successfully update post");
    }
  } else {
    if (isErrorAdd) console.log(errorAdd);
    if (isSuccessAdd) console.log("Successfully add post");
  }

  const handleGoToAddPost = () => {
    navigate("/dashboard/articles/new");
  };

  const handleCancel = () => {
    navigate("/dashboard/articles");
  };

  useEffect(() => {
    if (postToEdit) {
      console.log(postToEdit);

      setValue("_id", postToEdit._id);
      setValue("title", postToEdit.title);
      setValue("summary", postToEdit.summary);
      setValue("category", postToEdit.category);
      setValue("tag", postToEdit.tag);
      setValue("image", postToEdit.image);
      setValue("content", postToEdit.content);
      setValue("status", postToEdit.status);
      setValue("visibility", postToEdit.visibility);
      setValue("featured", postToEdit.featured);
    }
  }, [setValue, postToEdit]);

  return (
    <div className={`container__large ${classes["new-post"]}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes["new-form__form-wrapper"]}
      >
        <header className={classes["header"]}>
          <h2 className={classes["title"]}>{`${
            postToEdit ? "Edit post" : "Add new post"
          }`}</h2>
          {postToEdit && (
            <Button
              className={classes["add-new-post-button"]}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleGoToAddPost}
            >
              <span className={classes["add-new-post-button__label"]}>
                Add new post
              </span>
            </Button>
          )}
        </header>

        <div className={classes["new-form__form"]}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                className={`${classes["input-texfield-item-wrapper"]} ${classes["title"]}`}
                multiline
                maxRows={4}
                id="title"
                label="Title"
                variant="outlined"
                autoComplete="off"
              />
            )}
          />
          <Controller
            control={control}
            name="summary"
            render={({ field }) => (
              <TextField
                {...field}
                className={`${classes["input-texfield-item-wrapper"]} ${classes["summary"]}`}
                multiline
                maxRows={5}
                id="summary"
                label="Summary"
                variant="outlined"
                autoComplete="off"
              />
            )}
          />
          <div className={classes["new-form__form--right"]}>
            <div className={classes["categories-and-tags-wrapper"]}>
              <Controller
                control={control}
                name="category"
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl
                    className={`${classes["input-item-wrapper"]} ${classes["category"]}`}
                  >
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      {...field}
                      className={classes["select-category"]}
                      labelId="category"
                      id="category"
                      multiple
                      value={field.value}
                      input={<OutlinedInput label="Category" />}
                    >
                      {categoryOptions.map((categ) => (
                        <MenuItem key={categ.label} value={categ.value}>
                          {categ.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="tag"
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl
                    className={`${classes["input-item-wrapper"]} ${classes["tag"]}`}
                  >
                    <InputLabel id="tag">Tag</InputLabel>
                    <Select
                      {...field}
                      className={classes["select-category"]}
                      labelId="tag"
                      id="tag"
                      multiple
                      value={field.value}
                      input={<OutlinedInput label="Tag" />}
                    >
                      {tagOptions.map((tag) => (
                        <MenuItem key={tag.label} value={tag.value}>
                          {tag.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className={classes["status-visibility-wrapper"]}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormControl
                    className={`${classes["input-item-wrapper"]} ${classes["status"]}`}
                  >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      {...field}
                      className={classes["select-category"]}
                      labelId="status"
                      id="status"
                      value={field.value}
                      input={<OutlinedInput label="Name" />}
                      // MenuProps={MenuProps}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status.label} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="visibility"
                render={({ field }) => (
                  <FormControl
                    className={`${classes["input-item-wrapper"]} ${classes["visibility"]}`}
                  >
                    <InputLabel id="visibility">Visibility</InputLabel>
                    <Select
                      {...field}
                      className={classes["select-category"]}
                      labelId="visibility"
                      id="visibility"
                      value={field.value}
                      input={<OutlinedInput label="Visibility" />}
                      // MenuProps={MenuProps}
                    >
                      {visibilityOptions.map((visibility) => (
                        <MenuItem
                          key={visibility.label}
                          value={visibility.value}
                        >
                          {visibility.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className={classes["featured-and-image-wrapper"]}>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    className={classes["form__checkbox-wrapper"]}
                    control={<Checkbox checked={field.value} />}
                    label="Is featured?"
                    labelPlacement="start"
                  />
                )}
              />
              <Controller
                control={control}
                name="image"
                render={({ field }) => {
                  return (
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadFileIcon />}
                      size="large"
                      className={classes["upload-image-button"]}
                    >
                      Upload Cover Photo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (image) => {
                          const fileInput = image.target as HTMLInputElement;

                          if (fileInput.files && fileInput.files.length > 0) {
                            const reader = new FileReader();
                            reader.readAsDataURL(fileInput.files[0]);

                            for (const file of fileInput.files) {
                              console.log("file: ", URL.createObjectURL(file));
                              formData.append("file", file);
                            }

                            formData.append(
                              "upload_preset",
                              import.meta.env.VITE_CLOUDINARY_PRESET_NAME
                            );

                            try {
                              const response = await axios.post(
                                import.meta.env.VITE_CLOUDINARY_URL,
                                formData
                              );
                              const imageData = response.data;

                              console.log("Image data:", imageData.secure_url);
                              if (imageData.secure_url) {
                                field.onChange(imageData.secure_url);
                              }
                            } catch (error) {
                              console.error("Error uploading image:", error);
                            }
                          }
                        }}
                      />
                    </Button>
                  );
                }}
              />
            </div>
            {watch("image") && (
              <Paper
                // variant="outlined"
                elevation={1}
                className={classes["cover-photo-wrapper"]}
              >
                <img src={watch("image")} alt="cover photo" />
              </Paper>
            )}
          </div>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Suspense fallback={<CircularProgress />}>
                <DynamicQuillNoSSRWrapper
                  {...field}
                  id="content"
                  className={classes["editor"]}
                  theme="snow"
                  modules={QUILL_EDITOR_MODULES}
                  formats={QUILL_EDITOR_FORMATS}
                />
              </Suspense>
            )}
          />
          <div className={classes["button-wrapper"]}>
            <Button variant="outlined" size="large" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="large">
              {`${postToEdit ? "Update" : "Save"}`}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
