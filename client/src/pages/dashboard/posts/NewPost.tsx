import React, { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectAllCategories } from "../../../redux/categories/categories.api";
import { TPost } from "../../../redux/posts/posts.type";
import { postSchema } from "../../../redux/posts/posts.schema";
import {
  QUILL_EDITOR_FORMATS,
  QUILL_EDITOR_MODULES,
} from "../../../utils/Constant";
import classes from "../../../styles/pages/dashboard/NewPost.module.css";

import { TOption } from "../../../types/types";
import { selectAllTags } from "../../../redux/tags/tags.api";
import { useAddNewPostMutation } from "../../../redux/posts/posts.api";
const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);

const NewPost = () => {
  const { handleSubmit, control, watch, setValue, reset, formState } =
    useForm<TPost>({
      shouldFocusError: false,
      defaultValues: {
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
        articles: [],
      },
      resolver: zodResolver(postSchema),
    });

  // const [addNewPost, { isLoading, isSuccess, isError, error }] =
  //   useAddNewPostMutation();
  // const { data: categories } = useGetCategoriesQuery();
  const categories = useAppSelector(selectAllCategories);
  const tags = useAppSelector(selectAllTags);
  const formData: FormData = new FormData();

  console.log("formData: ", formData);

  console.log("watch: ", watch());

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  // const categoryArr = categories.map((category) => ({
  //   label: category.name,
  //   value: category._id,
  // }));

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
  // const categoriesOption = categories;

  const onSubmit = async (data: TPost) => {
    const {
      author,
      category,
      tag,
      title,
      summary,
      image,
      content,
      status,
      visibility,
      featured,
    } = data;

    try {
      console.log("========FINAL===============");

      console.log(watch());
    } catch (error) {
      console.log(`💥 ${error}`);
    }

    // if(title) {
    //   addNewPost({author, })
    // }
  };
  console.log("ERRORS: ", formState.errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="category"
          defaultValue={[]}
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Category</InputLabel>
              <Select
                {...field}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={field.value}
                input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
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
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Tag</InputLabel>
              <Select
                {...field}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={field.value}
                input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
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
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
          )}
        />
        <Controller
          control={control}
          name="summary"
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Summary"
              variant="outlined"
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          render={({ field }) => {
            return (
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload Cover Photo
                <input
                  type="file"
                  accept=".csv"
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
        <Controller
          name="featured"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Checkbox defaultChecked />}
              label="Label"
            />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Status</InputLabel>
              <Select
                {...field}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
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
        />{" "}
        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Category</InputLabel>
              <Select
                {...field}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={field.value}
                input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
              >
                {visibilityOptions.map((visibility) => (
                  <MenuItem key={visibility.label} value={visibility.value}>
                    {visibility.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Suspense fallback={<div>Loading Quill editor</div>}>
              <DynamicQuillNoSSRWrapper
                id="content"
                className={classes["editor"]}
                theme="snow"
                modules={QUILL_EDITOR_MODULES}
                formats={QUILL_EDITOR_FORMATS}
                value={field.value || ""}
                onChange={(text) => {
                  field.onChange(text);
                }}
              />
            </Suspense>
          )}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
