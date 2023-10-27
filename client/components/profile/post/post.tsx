import React from "react";
import PostList from "./postList";
import PullToRefresh from "react-simple-pull-to-refresh";

const Post = () => {
  return (
    <div>
      <PullToRefresh onRefresh={async () => alert("cool")}>
        <PostList />
      </PullToRefresh>
    </div>
  );
};

export default Post;
