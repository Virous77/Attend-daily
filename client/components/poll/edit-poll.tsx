import Post from "../addPost/post";

type EditPollType = {
  onClose: () => void;
};

const EditPoll: React.FC<EditPollType> = ({ onClose }) => {
  return <Post onClose={onClose} name="Update Poll" />;
};

export default EditPoll;
