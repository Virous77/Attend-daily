import React, { useState } from "react";
import Tab from "./tab";
import Post from "./post/post";
import PostOnly from "./post-only/post-only";
import PollOnly from "./poll/poll-only";

type ContentProps = {
  id: string;
};

const Content: React.FC<ContentProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="mt-5">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "feed" && <Post id={id} />}
      {activeTab === "post" && <PostOnly id={id} />}
      {activeTab === "poll" && <PollOnly id={id} />}
    </div>
  );
};

export default Content;
