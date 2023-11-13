import Poll from "./poll";
import Post from "./post";
import EditPost from "../editPost/editPost";

type LayoutProps = {
  type: string;
  onClose: () => void;
};
const Layout: React.FC<LayoutProps> = ({ type, onClose }) => {
  return (
    <section className=" overflow-scroll">
      {type === "post" && <Post onClose={onClose} name="Post" />}
      {type === "edit-post" && <EditPost onClose={onClose} />}
      {type === "poll" && <Poll onClose={onClose} />}
    </section>
  );
};

export default Layout;
