import Poll from "./poll";
import Post from "./post";
import EditPost from "../editPost/editPost";
import EditPoll from "../poll/edit-poll";
import Repost from "./repost";

import { TActive } from "@/store/useAppContext";

type LayoutProps = {
  type: TActive;
  onClose: () => void;
};
const Layout: React.FC<LayoutProps> = ({ type, onClose }) => {
  return (
    <section className=" overflow-scroll bg-background h-full">
      {type === "post" && <Post onClose={onClose} name="Post" />}
      {type === "edit-post" && <EditPost onClose={onClose} />}
      {type === "poll" && <Poll onClose={onClose} />}
      {type === "edit-poll" && <EditPoll onClose={onClose} />}
      {type === "repost" && <Repost onClose={onClose} />}
    </section>
  );
};

export default Layout;
