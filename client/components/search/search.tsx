import { QueryData, RecentSearch } from "@/types/types";
import SearchForm from "./search-form";
import SearchModel from "./search-model";
import { getServerData } from "@/api/server-api";
import { get } from "../../app/layout";
import Explore from "./explore";

type Response =
  | (QueryData & {
      data: RecentSearch;
    })
  | null;

const SearchComp = async () => {
  const value = await get();

  let search: Response = null;

  if (value?.value) {
    search = await getServerData({
      endpoint: "search/user",
      tag: "search",
    });
  }

  return (
    <main>
      <SearchForm />
      <SearchModel search={value?.value ? search?.data : undefined} />
      <Explore />
    </main>
  );
};

export default SearchComp;
