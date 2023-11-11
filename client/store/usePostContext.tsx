"use client";

import { useAppContext } from "./useAppContext";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

export type TFile = {
  image: string[];
  video: string[];
};

type TempFileType = {
  image: File[];
  video: File[];
};

type FormDataType = TFile & {
  title: string;
  pin: boolean;
  postType: "poll" | "post";
  location: string;
};

type StatusType = {
  isLoading: boolean;
};

type ContextType = {
  formData: FormDataType;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  preview: TFile;
  setPreview: Dispatch<SetStateAction<TFile>>;
  tempFileStore: TempFileType;
  setTempFileStore: Dispatch<SetStateAction<TempFileType>>;
  reset: () => void;
  setStatus: Dispatch<
    SetStateAction<{
      isLoading: boolean;
    }>
  >;
  status: StatusType;
};

const initialValue = {
  formData: {} as FormDataType,
  setFormData: () => {},
  preview: {} as TFile,
  setPreview: () => {},
  tempFileStore: {} as TempFileType,
  setTempFileStore: () => {},
  reset: () => {},
  status: {} as StatusType,
  setStatus: () => {},
};

const PostContext = createContext<ContextType>(initialValue);

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const formInitialState: FormDataType = {
    title: "",
    image: [],
    video: [],
    pin: false,
    postType: "post",
    location: "",
  };

  const previewInitialState: TFile = {
    image: [],
    video: [],
  };

  const tempInitialState: TempFileType = {
    image: [],
    video: [],
  };
  const [formData, setFormData] = useState(formInitialState);
  const [preview, setPreview] = useState(previewInitialState);
  const [tempFileStore, setTempFileStore] = useState(tempInitialState);
  const [status, setStatus] = useState({
    isLoading: false,
  });

  const reset = () => {
    setFormData(formInitialState);
    setPreview(previewInitialState);
    setTempFileStore(tempInitialState);
  };

  return (
    <PostContext.Provider
      value={{
        formData,
        setFormData,
        preview,
        setPreview,
        tempFileStore,
        setTempFileStore,
        reset,
        setStatus,
        status,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
export default PostContext;
