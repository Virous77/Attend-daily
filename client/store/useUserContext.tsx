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
import useQueryPost from "@/hooks/useQueryPost";
import { QueryResponse, QueryData } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

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
  handleFollow: (id: string) => void;
};

const initialState: ContextType = {
  userData: {} as stateType,
  setUserData: () => {},
  networkData: {} as NetworkDataType,
  refetch: () => {},
  isPending: false,
  handleFollow: () => {},
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
  const client = useQueryClient();

  const {
    fetchResult: networkData,
    isPending,
    refetch,
  }: NetworkQueryResponse = useQueryFetch({
    endPoints: "user/network",
    key: "user-network",
    staleTime: 5 * 60 * 1000,
  });

  const { mutateAsync } = useQueryPost();
  const handleFollow = async (id: string) => {
    const data = await mutateAsync({
      data: { followUser: id },
      endPoint: "follow",
    });
    if (data.status) {
      client.invalidateQueries({
        queryKey: ["user-network"],
      });
      toast({
        title: data.message,
        duration: 3000,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isPending,
        refetch,
        networkData,
        handleFollow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContext;
