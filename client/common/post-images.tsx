import { Image, useDisclosure } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FullImage from "./full-image";
import { useState } from "react";

type PostImagesProps = {
  image: string[];
};

const PostImages: React.FC<PostImagesProps> = ({ image }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [url, setUrl] = useState("");

  return (
    <>
      {image.length > 0 && (
        <Carousel
          showArrows={false}
          showIndicators={true}
          infiniteLoop={true}
          dynamicHeight={true}
          className=" mt-2 rounded-[15px]"
          showStatus={false}
          showThumbs={false}
          onClickItem={(index, item: any) => {
            setUrl(item.props.src);
            onOpen();
          }}
        >
          {image.map((img, idx) => (
            <Image
              src={img}
              alt={"post"}
              key={idx}
              width="100%"
              height="100%"
              shadow="sm"
              className=" rounded-[15px]"
              placeholder="blur"
              classNames={{ wrapper: " rounded-[10px]" }}
            />
          ))}
        </Carousel>
      )}
      <FullImage
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        url={url}
        type="image"
      />
    </>
  );
};

export default PostImages;
