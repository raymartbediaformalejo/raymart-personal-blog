import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { useParams } from "react-router-dom";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useGetPostQuery } from "../../redux/posts/posts.api";
import classes from "../../styles/pages/articles/SingleArticle.module.css";
import ArticleTag from "./components/ArticleTag";
import CalendarIcon from "../../components/icons/Calendar";

const SingleArticle = () => {
  const { id } = useParams();

  const { data: post } = useGetPostQuery({ id: id! });

  let content;

  const splitStringByPreTag = (inputString: string) => {
    const preTagStart = "<pre";
    const preTagEnd = "</pre>";
    const resultArray = [];

    let startIndex = 0;
    while (startIndex < inputString.length) {
      const preTagStartIndex = inputString.indexOf(preTagStart, startIndex);
      if (preTagStartIndex === -1) {
        // No more occurrences of "<pre" found, add the remaining part
        resultArray.push(inputString.substring(startIndex));
        break;
      }

      const preTagEndIndex = inputString.indexOf(preTagEnd, preTagStartIndex);
      if (preTagEndIndex === -1) {
        // No corresponding "</pre>" found, add the remaining part
        resultArray.push(inputString.substring(startIndex));
        break;
      }

      // Add the part before <pre
      resultArray.push(inputString.substring(startIndex, preTagStartIndex));
      // Add the <pre...> content
      resultArray.push(
        inputString.substring(
          preTagStartIndex,
          preTagEndIndex + preTagEnd.length
        )
      );

      startIndex = preTagEndIndex + preTagEnd.length;
    }

    return resultArray;
  };

  const removePreTags = (inputString: string) => {
    const regex = /<pre class="ql-syntax" spellcheck="false">|<\/pre>/g;
    return inputString.replace(regex, "");
  };

  if (post) {
    content = (
      <article className={classes["single-post"]}>
        <header className={classes["single-post__header"]}>
          <img
            src={post?.image}
            alt={post?.title}
            className={classes["thumbnail"]}
          />
          <div className={classes["header-info-wrapper"]}>
            <h1 className={classes["title"]}>{post?.title}</h1>
            <div className={classes["post-date-published"]}>
              <CalendarIcon />{" "}
              <p>{`Posted at ${post.createdAt.toLocaleDateString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}</p>
            </div>
            <div className={classes["tag-wrapper"]}>
              {post &&
                post.tag.map((tag) => {
                  if (typeof tag === "string") {
                    return <ArticleTag key={tag} tagId={tag} />;
                  } else return null;
                })}
            </div>
          </div>
        </header>
        <div className={classes["single-post__body"]}>
          {post &&
            post?.content &&
            splitStringByPreTag(post.content).map((content) => {
              if (content.startsWith("<pre")) {
                return (
                  <SyntaxHighlighter
                    key={content}
                    language="jsx"
                    style={vs2015}
                  >
                    {`${removePreTags(content)}`}
                  </SyntaxHighlighter>
                );
              } else {
                return (
                  <div
                    key={content}
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                );
              }
            })}
        </div>
      </article>
    );
  } else {
    content = <p>Loading...</p>;
  }

  return content;
};

export default SingleArticle;
