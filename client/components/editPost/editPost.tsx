import Post from "../addPost/post";

type EditPostType = {
  onClose: () => void;
};

const EditPost: React.FC<EditPostType> = ({ onClose }) => {
  return (
    <div>
      <Post onClose={onClose} name="Update Post" />
    </div>
  );
};

export default EditPost;
