import Post from "./post";

type RepostProps = {
  onClose: () => void;
};

const Repost: React.FC<RepostProps> = ({ onClose }) => {
  return <Post onClose={onClose} name="Repost" />;
};

export default Repost;
