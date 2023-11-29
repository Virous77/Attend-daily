import Image from "next/image";
import noPost from "../../public/post.svg";

const EmptyFeed = () => {
  return (
    <div className=" flex items-center justify-center mt-8">
      <Image src={noPost.src} alt="no post" width={150} height={150} />
    </div>
  );
};

export default EmptyFeed;
