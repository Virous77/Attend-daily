import { Image } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type PostImagesProps = {
  image: string[];
};

const PostImages: React.FC<PostImagesProps> = ({ image }) => {
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
    </>
  );
};

export default PostImages;
