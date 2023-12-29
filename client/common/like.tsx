import { useAppContext } from "@/store/useAppContext";
import { Heart } from "lucide-react";
import { useState } from "react";

type LikeProps = {
  value: string[];
  handleLike: () => void;
};

const LikeComp: React.FC<LikeProps> = ({ value, handleLike }) => {
  const {
    state: { user },
  } = useAppContext();
  const [currentLike, setCurrentLike] = useState<String[]>(value);

  const handleOptimisticLike = (like: string[], type: number) => {
    handleLike();
    if (type === 1) {
      setCurrentLike([...like, user?._id!]);
    } else {
      setCurrentLike(like.filter((s) => s !== user?._id));
    }
  };

  return (
    <div className=" flex items-center gap-1">
      {currentLike?.includes(user?._id || "") ? (
        <span
          className=" cursor-pointer"
          onClick={() => handleOptimisticLike(value, -1)}
        >
          <Heart size={20} color="red" className=" bg-red-700" />
        </span>
      ) : (
        <span
          className=" cursor-pointer"
          onClick={() => handleOptimisticLike(value, 1)}
        >
          <Heart size={20} />
        </span>
      )}
      {currentLike && currentLike.length > 0 && (
        <p className=" leading-none">{currentLike.length}</p>
      )}
    </div>
  );
};

export default LikeComp;
