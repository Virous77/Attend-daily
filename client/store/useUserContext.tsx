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
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "./useAppContext";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

export type stateType = {
  networkUser: string | null;
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
  handleFollow: (id: string, userName: string) => void;
  isFollowing: boolean;
};

const initialState: ContextType = {
  userData: {} as stateType,
  setUserData: () => {},
  networkData: {} as NetworkDataType,
  refetch: () => {},
  isPending: false,
  handleFollow: () => {},
  isFollowing: false,
};

const UserContext = createContext(initialState);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<stateType>({
    networkUser: null,
  });
  const {
    state: { user },
  } = useAppContext();

  const {
    fetchResult: networkData,
    isPending,
    refetch,
  }: NetworkQueryResponse = useQueryFetch({
    endPoints: `user/network/${user?.userName}`,
    key: "user-network",
    staleTime: 5 * 60 * 1000,
    enabled: user?.userName ? true : false,
  });
  const { invalidateKey } = useQueryInvalidate();

  const { mutateAsync, isPending: isFollowing } = useQueryPost();
  const handleFollow = async (id: string, userName: string) => {
    const data = await mutateAsync({
      data: { followUser: id },
      endPoint: "follow",
    });
    if (data.status) {
      invalidateKey("user-network");
      invalidateKey(`${userName}-userNetwork`);
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
        isFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContext;
