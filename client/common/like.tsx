import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useAppContext } from "@/store/useAppContext";

type LikeProps = {
  value: string[];
  handleLike: () => void;
};

const Like: React.FC<LikeProps> = ({ value, handleLike }) => {
  const {
    state: { user },
  } = useAppContext();
  return (
    <div className=" flex items-center gap-1">
      {value.includes(user?._id || "") ? (
        <span
          className=" cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <AiTwotoneHeart size={20} />
        </span>
      ) : (
        <span
          className=" cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <AiOutlineHeart size={20} />
        </span>
      )}
      {value.length > 0 && <p className=" leading-none">{value.length}</p>}
    </div>
  );
};

export default Like;
