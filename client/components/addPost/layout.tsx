import Poll from "./poll";
import Post from "./post";

type LayoutProps = {
  type: string;
  onClose: () => void;
};
const Layout: React.FC<LayoutProps> = ({ type, onClose }) => {
  return (
    <section className=" overflow-scroll">
      {type === "post" ? <Post onClose={onClose} /> : <Poll />}
    </section>
  );
};

export default Layout;
