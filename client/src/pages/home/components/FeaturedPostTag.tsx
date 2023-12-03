import Chip from "../../../components/ui/Chip";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { selectTagById } from "../../../redux/tags/tags.api";

type FeaturedPostTagProps = {
  tagId: string;
};
const FeaturedPostTag = ({ tagId }: FeaturedPostTagProps) => {
  const tag = useAppSelector((state) => selectTagById(state, tagId));

  let content;

  if (tag) content = <Chip text={tag.name} variant="contained" size="small" />;

  if (!tag) content = <Chip text="Loading..." />;

  return content;
};

export default FeaturedPostTag;
