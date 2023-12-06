import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectTagById } from "../../../redux/tags/tags.api";
import Chip from "../../../components/ui/Chip";
import { SECONDARY_NAVIGATIONS_ITEMS } from "../../../utils/Constant";

type ArticleTagProps = {
  tagId: string;
};

const ArticleTag = ({ tagId }: ArticleTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  let content;

  if (tag) {
    content = (
      <Chip
        to={`${
          SECONDARY_NAVIGATIONS_ITEMS.TOPICS.url
        }/${tag.name.toLowerCase()}`}
        text={tag.name}
        variant="contained"
        size="small"
      />
    );
  } else content = null;

  return content;
};

export default ArticleTag;
