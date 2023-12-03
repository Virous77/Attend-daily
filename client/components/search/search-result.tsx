import useQueryFetch from "@/hooks/useQueryFetch";
import { useAppContext } from "@/store/useAppContext";
import { ScrollArea } from "../ui/scroll-area";
import { QueryData, QueryResponse, Search } from "@/types/types";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useQueryPost from "@/hooks/useQueryPost";

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: Search[];
  };
};

const SearchResult = () => {
  const { search } = useAppContext();
  const router = useRouter();

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

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap mt-3 pl-1 pr-1">
        <ul className="flex items-center gap-2">
          {fetchResult?.data?.map((item) => (
            <li
              key={item._id}
              className=" flex flex-col items-center justify-center w-[75px] overflow-hidden cursor-pointer"
              onClick={() => handleRedirect(item.userName, item._id)}
            >
              <Avatar src={item.image} size="lg" name={item.name} />
              <div className=" mt-2 flex flex-col gap-[3px] items-center justify-center">
                <p className=" text-[13px] leading-none text-ellipsis whitespace-nowrap w-[75px] overflow-hidden">
                  {item.name}
                </p>
                <span className=" text-[12px] opacity-50 leading-none text-ellipsis whitespace-nowrap w-[75px] overflow-hidden">
                  @{item.userName}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SearchResult;
