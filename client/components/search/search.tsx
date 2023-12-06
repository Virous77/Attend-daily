import { QueryData, RecentSearch } from "@/types/types";
import SearchForm from "./search-form";
import SearchModel from "./search-model";
import { getServerData } from "@/api/server-api";

type Response = QueryData & {
  data: RecentSearch;
};

const SearchComp = async () => {
  const search: Response = await getServerData({
    endpoint: "search/user",
    tag: "search",
  });

  return (
    <main>
      <SearchForm />
      <SearchModel search={search.data} />
    </main>
  );
};

export default SearchComp;
