import React, { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import axios from "axios";

import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectAllCategories } from "../../../redux/categories/categories.api";
import { TPost } from "../../../redux/posts/posts.type";
import { postSchema } from "../../../redux/posts/posts.schema";
import {
  QUILL_EDITOR_FORMATS,
  QUILL_EDITOR_MODULES,
} from "../../../utils/Constant";
import classes from "../../../styles/pages/dashboard/NewPost.module.css";
import PostInputController from "../../../components/input/PostInputController";
import { useGetCategoriesQuery } from "../../../redux/categories/categories.api";
import { TOption, TGroupOption } from "../../../types/types";
import { GroupBase } from "react-select";
import PostSelectController from "../../../components/select/PostSelectController";
import { selectAllTags } from "../../../redux/tags/tags.api";
const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);

const NewPost = () => {
  const { handleSubmit, control, watch, reset, formState } = useForm<TPost>({
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
  const coverImage = watch("image");
  // const { data: categories } = useGetCategoriesQuery();
  const categories = useAppSelector(selectAllCategories);
  const tags = useAppSelector(selectAllTags);

  console.log("watch: ", watch());

  const categoryOptions: TOption[] = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const tagOptions = tags.map((tag) => ({ value: tag._id, label: tag.name }));

  // const categoriesOption = categories;

  return (
    <div>
      <form>
        <PostSelectController
          name="category"
          control={control}
          placeholder="Category"
          options={categoryOptions}
          errors={formState.errors}
        />
        <PostSelectController
          name="tag"
          control={control}
          placeholder="Tag"
          options={tagOptions}
          errors={formState.errors}
        />
        <PostInputController
          name="title"
          control={control}
          placeholder="Title"
          type="text"
          errorMessage={formState.errors.title?.message}
        />
        <PostInputController
          name="summary"
          control={control}
          placeholder="Summary"
          type="text"
          errorMessage={formState.errors.summary?.message}
        />
        <Controller
          control={control}
          name="image"
          render={({ field }) => {
            return (
              <div>
                <p>Cover photo:</p>
                <div>
                  <label htmlFor="cover-photo">
                    <p>Choose file</p>
                  </label>
                  <input
                    onChange={async (image) => {
                      const fileInput = image.target as HTMLInputElement;

                      if (fileInput.files && fileInput.files.length > 0) {
                        const reader = new FileReader();
                        reader.readAsDataURL(fileInput.files[0]);

                        const formData = new FormData();
                        for (const file of fileInput.files) {
                          console.log("file: ", file);

                          formData.append("file", file);
                        }
                        formData.append(
                          "upload_preset",
                          import.meta.env.VITE_CLOUDINARY_PRESET_NAME
                        );

                        console.log(formData);

                        try {
                          const response = await axios.post(
                            import.meta.env.VITE_CLOUDINARY_URL,
                            formData
                          );
                          const imageData = response.data;

                          console.log("Image data:", imageData.secure_url);
                          // if (imageData.secure_url) {
                          //   imageSrc = imageData.secure_url;
                          // }
                        } catch (error) {
                          console.error("Error uploading image:", error);
                        }
                      }

                      field.onChange(image);
                    }}
                    id="cover-photo"
                    name="cover-photo"
                    type="file"
                  />
                  <span>{field.value ? field.value : "No file chosen"}</span>
                </div>

                {field.value && typeof field.value === "string" ? (
                  <div>
                    <img src={coverImage} alt="Cover photo" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }}
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
      </form>
    </div>
  );
};

export default NewPost;
