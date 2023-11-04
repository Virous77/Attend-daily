import React from "react";
import { useAppContext } from "@/store/useAppContext";

type PostVideosProps = {
  video: string[];
};

const PostVideos: React.FC<PostVideosProps> = ({ video }) => {
  const {
    state: { user },
  } = useAppContext();

  const videoGrid = {
    "1": "grid-cols-1",
    "2": "grid-cols-2",
    "3": "grid-cols-2",
    "4": "grid-cols-2",
  } as any;
  return (
    <>
      {video.length > 0 && (
        <div>
          <ul className={`grid ${videoGrid[String(video.length)]} gap-2 mt-2`}>
            {video.map((video) => (
              <iframe
                src={`https://player.cloudinary.com/embed/?public_id=${video}&cloud_name=${process.env.NEXT_PUBLIC_CLOUD_ID}&player[muted]=true&player[controlBar][fullscreenToggle]=false&player[logoOnclickUrl]=${user?.image}&player[logoImageUrl]=${user?.image}&player[floatingWhenNotVisible]=right&player[posterOptions][transformation][startOffset]=0&player[autoplayMode]=on-scroll&player[autoplay]=true&player[loop]=true&source[sourceTypes][0]=webm%2Fvp9&source[sourceTypes][1]=mp4%2Fh265&source[sourceTypes][2]=mp4&source[sourceTypes][3]=webm&source[sourceTypes][4]=mp4%2Fh264`}
                width="640"
                height="360"
                style={{
                  height: "auto",
                  width: "100%",
                  aspectRatio: "640/360",
                }}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                key={video}
              ></iframe>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostVideos;
