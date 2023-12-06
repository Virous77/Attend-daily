"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import SearchForm from "./search-form";
import { useAppContext } from "@/store/useAppContext";
import SearchResult from "./search-result";
import { QueryData, QueryResponse, RecentSearch, Search } from "@/types/types";
import useQueryFetch from "@/hooks/useQueryFetch";
import { useState } from "react";

export type SearchType = {
  search: RecentSearch;
};

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: Search[];
  };
};

const SearchModel: React.FC<SearchType> = ({ search }) => {
  const { activeType, setActiveType, setSearch } = useAppContext();
  const [timer, setTimer] = useState<any>(undefined);
  const [query, setQuery] = useState("");

  const { fetchResult, isLoading }: Response = useQueryFetch({
    endPoints: `search?query=${query}`,
    key: `search-${query}`,
    enabled: query.length > 1 ? true : false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setQuery(value);
    }, 500);

    setSearch(value);
    setTimer(newTimer);
  };

  const onOpenChange = () => {
    setActiveType("");
  };
  return (
    <Modal
      isOpen={activeType === "search" ? true : false}
      onOpenChange={onOpenChange}
      size="full"
      hideCloseButton={true}
      classNames={{
        backdrop: "z-[1000]",
        wrapper: "z-[10000]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <SearchForm handleInputChange={handleInputChange} />
            </ModalHeader>
            <ModalBody className=" w-full mt-7 p-0">
              <SearchResult search={search} data={fetchResult?.data} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SearchModel;
