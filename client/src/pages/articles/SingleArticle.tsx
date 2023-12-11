import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { selectPostById } from "../../redux/posts/posts.api";

const SingleArticle = () => {
  const { id } = useParams();
  const post = useAppSelector((state) => selectPostById(state, id as string));

  console.log("POST: ", post);

  return (
    <div>
      <img src={post?.image} />
      <h2>{post?.title}</h2>
      <code>Hello world</code>
      {post?.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      )}
    </div>
  );
};

export default SingleArticle;
