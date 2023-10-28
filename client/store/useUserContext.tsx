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

export type stateType = {
  network: UserNetwork | null;
};

type QueryData = {
  data: UserNetwork | null;
  message: string;
  state: boolean;
};

type QueryResponse = {
  fetchResult: QueryData;
  isPending: boolean;
  refetch: () => void;
};

type ContextType = {
  userData: stateType;
  setUserData: Dispatch<SetStateAction<stateType>>;
  networkData: QueryData;
  refetch: () => void;
  isPending: boolean;
};

const initialState: ContextType = {
  userData: {} as stateType,
  setUserData: () => {},
  networkData: {} as QueryData,
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
  }: QueryResponse = useQueryFetch({
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
