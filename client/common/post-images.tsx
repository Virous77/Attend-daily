import { Image } from "@nextui-org/react";
import React from "react";

type PostImagesProps = {
  image: string[];
};

const PostImages: React.FC<PostImagesProps> = ({ image }) => {
  return (
    <>
      {image.length > 0 && (
        <div>
          <ul
            className=" grid  gap-2 mt-2 grid-cols-2"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {image.map((img, idx) => (
              <Image
                src={img}
                alt={"post"}
                key={idx}
                width="100%"
                height="100%"
                className=" max-h-96 cursor-pointer hover:scroll-smooth transition-opacity opacity-0 duration-[2s]"
                shadow="sm"
                placeholder="blur"
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostImages;
