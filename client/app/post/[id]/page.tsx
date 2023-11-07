import SinglePost from "@/components/post/SinglePost";

const Page = ({ params }: { params: { id: string } }) => {
  return <SinglePost id={params.id} />;
};

export default Page;
