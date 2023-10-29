import React from "react";
import PostList from "./postList";
import PullToRefresh from "react-simple-pull-to-refresh";
import Loader from "@/components/ui/loader/Loader";

const Post = () => {
  return (
    <div>
      <PullToRefresh
        onRefresh={async () => alert("cool")}
        pullingContent={<Loader />}
        pullDownThreshold={100}
      >
        <PostList />
      </PullToRefresh>
    </div>
  );
};

export default Post;
