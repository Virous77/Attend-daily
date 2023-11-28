import { Send, UserMinus, UserPlus } from "lucide-react";
import { UserNetwork } from "@/types/types";
import { useAppContext } from "@/store/useAppContext";
import { useUserContext } from "@/store/useUserContext";

type ProfileType = {
  otherUserNetworkData: UserNetwork;
  userName: string;
};

const ProfileAction: React.FC<ProfileType> = ({
  otherUserNetworkData,
  userName,
}) => {
  const {
    state: { user },
  } = useAppContext();

  const isFollowing = otherUserNetworkData?.followers?.find(
    (network) => network.id._id === user?._id
  );
  const { handleFollow } = useUserContext();

  const common =
    "w-[35px] h-[35px] rounded-full bg-accent flex items-center justify-center cursor-pointer";

  return (
    <div className=" flex items-center gap-4">
      {!isFollowing ? (
        <span className={common}>
          <UserPlus
            size={22}
            onClick={() => handleFollow(otherUserNetworkData.userId, userName)}
          />
        </span>
      ) : (
        <span className={common}>
          <UserMinus
            size={22}
            onClick={() => handleFollow(otherUserNetworkData.userId, userName)}
          />
        </span>
      )}
      <span className={common}>
        <Send size={21} />
      </span>
    </div>
  );
};

export default ProfileAction;
