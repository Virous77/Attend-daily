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
import { User } from "@/types/types";
import { useDisclosure } from "@nextui-org/react";

type ModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export type stateType = {
  authModal: boolean;
  feedType: string;
  isLogged: boolean;
  user: User | null;
  isLoading: string;
  open: string;
};

type ContextType = {
  state: stateType;
  setState: Dispatch<SetStateAction<stateType>>;
  refetch: () => void;
  modal: ModalType;
  isPending: boolean;
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
  modal: {} as ModalType,
  isPending: false,
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
    isLoading: "",
    open: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modal = {
    isOpen,
    onOpen,
    onOpenChange,
  };

  const { refetch, isPending } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["user"],
    queryFn: async () => {
      const token: StatusType = await getData({
        endPoints: "/api/status",
        url: process.env.NEXT_PUBLIC_FRONTEND_URL,
      });
      const data = await getData({
        endPoints: "auth/status",
        token: token.token.value,
      });

      setState((prev) => ({
        ...prev,
        user: data.data,
      }));

      return data.data;
    },
    retry: false,
  });

  return (
    <AppContext.Provider value={{ setState, state, refetch, modal, isPending }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
