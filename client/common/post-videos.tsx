import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player/file";

type PostVideosProps = {
  video: string[];
};

const PostVideos: React.FC<PostVideosProps> = ({ video }) => {
  return (
    <>
      {video.length > 0 && (
        <Carousel
          showArrows={false}
          showIndicators={true}
          infiniteLoop={true}
          className=" mt-3 w-full rounded-sm"
          showThumbs={false}
          showStatus={false}
        >
          {video.map((video) => (
            <div key={video} className=" w-full h-full">
              <ReactPlayer
                url={video}
                playing={true}
                loop={true}
                width={"100%"}
                height={"100%"}
                onReady={() => true}
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default PostVideos;
