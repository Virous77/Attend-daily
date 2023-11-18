import Post from "./post";

type PollType = {
  onClose: () => void;
};

const Poll: React.FC<PollType> = ({ onClose }) => {
  return (
    <>
      <Post name="Poll" onClose={onClose} />
    </>
  );
};

export default Poll;
