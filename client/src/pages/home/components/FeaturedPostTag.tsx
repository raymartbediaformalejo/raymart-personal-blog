import Chip from "../../../components/ui/Chip";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectTagById } from "../../../redux/tags/tags.api";
import { SECONDARY_NAVIGATIONS_ITEMS } from "../../../utils/Constant";

type FeaturedPostTagProps = {
  tagId: string;
};
const FeaturedPostTag = ({ tagId }: FeaturedPostTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));

  let content;

  if (tag)
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

  if (!tag) content = <p>Loading...</p>;

  return content;
};

export default FeaturedPostTag;
