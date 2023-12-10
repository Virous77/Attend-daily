import React, { useState } from "react";
import Tab from "./tab";
import Post from "./post/post";
import PostOnly from "./post-only/post-only";
import PollOnly from "./poll/poll-only";
import { CompletePost } from "@/types/types";

type TContent = {
  id: string;
  pinPost: CompletePost | null;
};

const Content: React.FC<TContent> = ({ id, pinPost }) => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="mt-5">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "feed" && <Post id={id} pinPost={pinPost} />}
      {activeTab === "post" && <PostOnly id={id} />}
      {activeTab === "poll" && <PollOnly id={id} />}
    </div>
  );
};

export default Content;
