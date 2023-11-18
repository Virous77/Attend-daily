"use client";

import { useDisclosure } from "@nextui-org/react";
import { ModalType } from "./useAppContext";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import moment from "moment";

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
  postType: string;
  location: string;
  id: string;
};

type StatusType = {
  isLoading: boolean;
};

type StateType = {
  date: Date;
  hour: string;
  minutes: string;
  type: string;
  firstMinutes: string;
  firstHour: string;
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
  modal: ModalType;
  time: StateType;
  setTime: Dispatch<SetStateAction<StateType>>;
  formatTime: string[];
  choice: string[];
  setChoice: Dispatch<SetStateAction<string[]>>;
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
  modal: {} as ModalType,
  time: {} as StateType,
  setTime: () => {},
  formatTime: [],
  choice: [],
  setChoice: () => {},
};

const PostContext = createContext<ContextType>(initialValue);

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const formInitialState: FormDataType = {
    title: "",
    image: [],
    video: [],
    pin: false,
    postType: "",
    location: "",
    id: "",
  };

  const previewInitialState: TFile = {
    image: [],
    video: [],
  };

  const tempInitialState: TempFileType = {
    image: [],
    video: [],
  };

  const currentTime = moment().format("hh:mm:A");
  const formatTime = currentTime.split(":");

  const pollTimeInitialState: StateType = {
    date: new Date(),
    hour: formatTime[0],
    minutes: formatTime[1],
    type: formatTime[2],
    firstMinutes: "",
    firstHour: "",
  };

  const choiceInitialState = ["", ""];

  const [formData, setFormData] = useState(formInitialState);
  const [preview, setPreview] = useState(previewInitialState);
  const [tempFileStore, setTempFileStore] = useState(tempInitialState);
  const [status, setStatus] = useState({
    isLoading: false,
  });
  const [time, setTime] = useState(pollTimeInitialState);
  const [choice, setChoice] = useState(choiceInitialState);

  const { isOpen, onOpen, onOpenChange }: ModalType = useDisclosure();
  const modal = { isOpen, onOpen, onOpenChange };

  const reset = () => {
    setFormData(formInitialState);
    setPreview(previewInitialState);
    setTempFileStore(tempInitialState);
    setTime(pollTimeInitialState);
    setChoice(choiceInitialState);
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
        modal,
        time,
        setTime,
        formatTime,
        choice,
        setChoice,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
export default PostContext;
