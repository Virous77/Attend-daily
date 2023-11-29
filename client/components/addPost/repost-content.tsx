import { usePost } from "@/store/usePostContext";

const RePostContent = () => {
  const { rePostData } = usePost();

  console.log(rePostData);
  return <div>RePostContent</div>;
};

export default RePostContent;
