import React, { useState } from "react";
import Tab from "./tab";
import Post from "./post/post";

const Content = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="mt-5">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "feed" && <Post />}
    </div>
  );
};

export default Content;
