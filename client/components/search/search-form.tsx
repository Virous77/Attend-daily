"use client";

import { Input } from "../ui/input";
import { useAppContext } from "@/store/useAppContext";
import { Search } from "lucide-react";

const SearchForm = () => {
  const { activeType, setActiveType, search, setSearch } = useAppContext();

  return (
    <div className=" fixed top-0 left-0 w-full bg-accent px-5 py-3 flex items-center justify-between gap-4 z-10">
      {activeType !== "search" && (
        <span className=" text-[17px] font-bold uppercase">Explore</span>
      )}

      {activeType !== "search" && (
        <span
          onClick={() => setActiveType("search")}
          className=" w-[200px] p-2 rounded bg-accent cursor-pointer flex items-center justify-center"
          style={{ border: "0.5px solid silver" }}
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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className=" focus:ring-0 focus-visible:ring-0"
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
