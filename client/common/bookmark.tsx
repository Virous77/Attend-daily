import { useUserContext } from "@/store/useUserContext";
import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useState } from "react";

type TBookmark = {
  handleBookmark: (e: string) => void;
  postId: string;
};

const Bookmark: React.FC<TBookmark> = ({ handleBookmark, postId }) => {
  const { networkData } = useUserContext();
  const [bookmark, setBookmark] = useState(networkData?.data?.bookMarks);

  const handleOptimisticBookmark = (id: string, type: number) => {
    handleBookmark(id);

    if (type === 1) {
      setBookmark((prev) => (prev!?.length > 0 ? [...prev!, id] : [id]));
    } else {
      setBookmark((prev) => prev?.filter((s) => s !== id));
    }
  };

  return (
    <div className=" flex items-center">
      {bookmark?.includes(postId) ? (
        <span
          className=" cursor-pointer"
          onClick={() => handleOptimisticBookmark(postId, -1)}
        >
          <BookmarkMinus size={21} color="green" />
        </span>
      ) : (
        <span
          className=" cursor-pointer"
          onClick={(e) => handleOptimisticBookmark(postId, 1)}
        >
          <BookmarkPlus size={21} />
        </span>
      )}
    </div>
  );
};

export default Bookmark;
