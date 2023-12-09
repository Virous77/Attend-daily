import { useAppContext } from "@/store/useAppContext";
import { Heart } from "lucide-react";

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
      {value?.includes(user?._id || "") ? (
        <span className=" cursor-pointer" onClick={handleLike}>
          <Heart size={20} color="red" className=" bg-red-700" />
        </span>
      ) : (
        <span className=" cursor-pointer" onClick={handleLike}>
          <Heart size={20} />
        </span>
      )}
      {value?.length > 0 && <p className=" leading-none">{value?.length}</p>}
    </div>
  );
};

export default Like;
