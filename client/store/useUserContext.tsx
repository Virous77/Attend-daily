"use client";

import { UserNetwork } from "@/types/types";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import useQueryFetch from "@/hooks/useQueryFetch";
import { QueryResponse, QueryData } from "@/types/types";

export type stateType = {
  network: UserNetwork | null;
};

type NetworkDataType = QueryData & {
  data: UserNetwork | null;
};

type NetworkQueryResponse = QueryResponse & {
  fetchResult: NetworkDataType;
};

type ContextType = {
  userData: stateType;
  setUserData: Dispatch<SetStateAction<stateType>>;
  networkData: NetworkDataType;
  refetch: () => void;
  isPending: boolean;
};

const initialState: ContextType = {
  userData: {} as stateType,
  setUserData: () => {},
  networkData: {} as NetworkDataType,
  refetch: () => {},
  isPending: false,
};

const UserContext = createContext(initialState);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<stateType>({
    network: null,
  });

  const {
    fetchResult: networkData,
    isPending,
    refetch,
  }: NetworkQueryResponse = useQueryFetch({
    endPoints: "user/network",
    key: "user-network",
    staleTime: 5 * 60 * 100,
  });

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isPending, refetch, networkData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContext;
