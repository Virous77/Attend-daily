import { ScrollArea } from "../ui/scroll-area";
import { Search } from "@/types/types";
import { Avatar, Button, User, user } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useQueryPost from "@/hooks/useQueryPost";
import { SearchType } from "./search-model";
import { useUserContext } from "@/store/useUserContext";

const SearchResult: React.FC<SearchType & { data: Search[] }> = ({
  search: recentSearch,
  data,
}) => {
  const router = useRouter();
  const { networkData, handleFollow } = useUserContext();
  const { mutateAsync } = useQueryPost();

  const handleRedirect = (userName: string, id: string) => {
    router.push(`/profile/${userName}`);
    mutateAsync({ endPoint: "/search/add", data: { searchedUser: id } });
  };

  return (
    <div>
      {recentSearch && recentSearch?.length > 0 ? (
        <>
          {Object?.values(recentSearch)?.length > 0 && !data && (
            <ScrollArea className="w-full whitespace-nowrap mt-3 pl-1 pr-1">
              <ul className="flex items-center gap-2">
                {Object.values(recentSearch)
                  .sort((a, b) => b.count - a.count)
                  ?.map((item) => (
                    <li
                      key={item._id}
                      className=" flex flex-col items-center justify-center w-[75px] overflow-hidden cursor-pointer"
                      onClick={() =>
                        handleRedirect(item.user.userName, item.user._id)
                      }
                    >
                      <Avatar
                        src={item.user.image}
                        size="lg"
                        name={item.user.name}
                      />
                      <div className=" mt-2 flex flex-col gap-[3px] items-center justify-center">
                        <p className=" text-[13px] leading-none text-ellipsis whitespace-nowrap w-[75px] overflow-hidden">
                          {item.user.name}
                        </p>
                        <span className=" text-[12px] opacity-50 leading-none text-ellipsis whitespace-nowrap w-[75px] overflow-hidden">
                          @{item.user.userName}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </ScrollArea>
          )}
        </>
      ) : null}

      <ScrollArea className="h-fit w-full mt-3">
        <ul className="flex flex-col gap-3 pl-4 pr-4">
          {data?.length > 0 &&
            data?.map((item) => (
              <li key={item._id} className=" flex items-center justify-between">
                <User
                  name={item.name}
                  description={`@${item.userName}`}
                  avatarProps={{
                    src: item.image,
                  }}
                  className=" cursor-pointer"
                  onClick={() => handleRedirect(item.userName, item._id)}
                />

                {networkData.data?.userId !== item._id && (
                  <>
                    {networkData.data?.following.find(
                      (user) => user.id._id === item._id
                    ) ? (
                      <Button
                        className="rounded"
                        variant="ghost"
                        color="primary"
                        style={{ height: "30px" }}
                        onClick={() => handleFollow(item._id, item.userName)}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        className="rounded"
                        style={{ height: "30px" }}
                        variant="shadow"
                        color="primary"
                        onClick={() => handleFollow(item._id, item.userName)}
                      >
                        Follow
                      </Button>
                    )}
                  </>
                )}
              </li>
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SearchResult;
