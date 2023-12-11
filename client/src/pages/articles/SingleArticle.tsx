import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { useParams } from "react-router-dom";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { selectPostById } from "../../redux/posts/posts.api";

const SingleArticle = () => {
  const { id } = useParams();
  const post = useAppSelector((state) => selectPostById(state, id as string));

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

  return (
    <div>
      <img src={post?.image} />
      <h2>{post?.title}</h2>
      <code>Hello world</code>
      {post &&
        post?.content &&
        splitStringByPreTag(post.content).map((content) => {
          if (content.startsWith("<pre")) {
            return (
              <SyntaxHighlighter key={content} language="jsx" style={vs2015}>
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
  );
};

export default SingleArticle;
