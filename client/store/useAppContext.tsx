"use client";

import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

export type stateType = {
  authModal: boolean;
  feedType: string;
  isLogged: boolean;
};

type ContextType = {
  state: stateType;
  setState: Dispatch<SetStateAction<stateType>>;
};

const initialValue = {
  state: {} as stateType,
  setState: () => {},
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
  });

  return (
    <AppContext.Provider value={{ setState, state }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
