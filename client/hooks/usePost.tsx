import { useState } from "react";

export type TFile = {
  image: string[];
  video: string[];
};

type formDataType = TFile & {
  title: string;

  pin: boolean;
  postType: "poll" | "post";
  location: string;
};

const usePost = () => {
  const [formData, setFormData] = useState<formDataType>({
    title: "",
    image: [],
    video: [],
    pin: false,
    postType: "post",
    location: "",
  });

  const handleSavePost = async () => {
    console.log(formData);
  };
  return {
    formData,
    setFormData,
    handleSavePost,
  };
};

export default usePost;
