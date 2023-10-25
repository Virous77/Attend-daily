"use client";

import { getData } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import jwt_decode from "jwt-decode";
import { User } from "@/types/types";

export type stateType = {
  authModal: boolean;
  feedType: string;
  isLogged: boolean;
  user: User | null;
};

type ContextType = {
  state: stateType;
  setState: Dispatch<SetStateAction<stateType>>;
  refetch: () => void;
};

type LoginUserType = {
  data: User;
};

type StatusType = {
  status: boolean;
  token: {
    name: string;
    value: string;
    path: string;
  };
};

const initialValue = {
  state: {} as stateType,
  setState: () => {},
  refetch: () => {},
};

const AppContext = createContext<ContextType>(initialValue);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<stateType>({
    authModal: false,
    feedType: "home feed",
    isLogged: false,
    user: null,
  });

  const { refetch } = useQuery({
    staleTime: 5 * 60 * 100,
    queryKey: ["user"],
    queryFn: async () => {
      const data: StatusType = await getData({
        endPoints: "/api/status",
        url: "http://localhost:3000",
      });

      if (!data.status) return null;

      const userData: LoginUserType = jwt_decode(data.token.value);
      setState((prev) => ({ ...prev, user: userData.data }));
      return userData;
    },
  });

  return (
    <AppContext.Provider value={{ setState, state, refetch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
