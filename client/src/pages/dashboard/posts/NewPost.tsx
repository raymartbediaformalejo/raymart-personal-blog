import React, { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";

import { TPost } from "../../../redux/posts/posts.type";
import { postSchema } from "../../../redux/posts/posts.schema";
import {
  QUILL_EDITOR_FORMATS,
  QUILL_EDITOR_MODULES,
} from "../../../utils/Constant";
import classes from "../../../styles/pages/dashboard/NewPost.module.css";
import PostControllerInput from "../../../components/input/PostControllerInput";

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

  console.log("watch: ", watch());

  return (
    <div>
      <form>
        <PostControllerInput
          name="title"
          control={control}
          placeholder="Title"
          type="text"
          errorMessage={formState.errors.title?.message}
        />
        <PostControllerInput
          name="summary"
          control={control}
          placeholder="Summary"
          type="text"
          errorMessage={formState.errors.summary?.message}
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
