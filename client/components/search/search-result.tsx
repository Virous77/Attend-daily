import useQueryFetch from "@/hooks/useQueryFetch";
import { useAppContext } from "@/store/useAppContext";
import { ScrollArea } from "../ui/scroll-area";
import { QueryData, QueryResponse, Search } from "@/types/types";
import { Avatar, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useQueryPost from "@/hooks/useQueryPost";
import { SearchType } from "./search-model";
import { Button } from "../ui/button";
import { useUserContext } from "@/store/useUserContext";

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: Search[];
  };
};

const SearchResult: React.FC<SearchType> = ({ search: recentSearch }) => {
  const { search } = useAppContext();
  const router = useRouter();
  const { networkData } = useUserContext();

  const { mutateAsync } = useQueryPost();

  const { fetchResult, isLoading }: Response = useQueryFetch({
    endPoints: `search?query=${search}`,
    key: `search-${search}`,
    enabled: search.length > 1 ? true : false,
  });

  const handleRedirect = (userName: string, id: string) => {
    router.push(`/profile/${userName}`);
    mutateAsync({ endPoint: "/search/add", data: { searchedUser: id } });
  };

  return (
    <div>
      {Object.values(recentSearch)?.length > 0 && !fetchResult?.data && (
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

      <ScrollArea className="h-fit w-full mt-3">
        <ul className="flex flex-col gap-3 pl-4 pr-4">
          {fetchResult?.data?.length > 0 &&
            fetchResult?.data?.map((item) => (
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

                {networkData.data?.following.find(
                  (user) => user.id._id === item._id
                ) ? (
                  <Button className="rounded" style={{ height: "35px" }}>
                    Unfollow
                  </Button>
                ) : (
                  <Button className="rounded" style={{ height: "35px" }}>
                    Follow
                  </Button>
                )}
              </li>
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SearchResult;
