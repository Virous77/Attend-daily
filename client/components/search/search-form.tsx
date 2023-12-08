"use client";

import { useAppContext } from "@/store/useAppContext";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

type SearchFormType = {
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchForm: React.FC<SearchFormType> = ({ handleInputChange }) => {
  const { activeType, setActiveType, search, setSearch } = useAppContext();

  return (
    <div
      className=" fixed top-0 left-0 w-full bg-background  px-5 py-3 flex items-center justify-between gap-4 z-10"
      style={{ boxShadow: "var(--shadow)" }}
    >
      {activeType !== "search" && (
        <span className=" text-[17px] font-bold uppercase">Explore</span>
      )}

      {activeType !== "search" && (
        <span
          onClick={() => setActiveType("search")}
          className=" w-[200px] p-2 rounded cursor-pointer flex items-center justify-center border"
        >
          <p className=" opacity-40 flex items-center gap-[5px]">
            <Search size={16} />
            Search
          </p>
        </span>
      )}

      {activeType === "search" && (
        <Input
          value={search}
          onChange={handleInputChange!}
          placeholder="Search"
          className=" focus:ring-0 focus-visible:ring-0"
          variant="bordered"
        />
      )}
      {activeType === "search" && (
        <span
          onClick={() => {
            setActiveType("");
            setSearch("");
          }}
          className=" cursor-pointer"
        >
          Cancel
        </span>
      )}
    </div>
  );
};

export default SearchForm;
