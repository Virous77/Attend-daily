import axios from "axios";
import { localAppError } from "@/utils/utils";

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

type PostProps = {
  endPoints: string;
  params: any;
};

export const postData = async ({ endPoints, params }: PostProps) => {
  try {
    const { data } = await axios.post(`${base_url}${endPoints}`, params);
    return data;
  } catch (error: any) {
    throw error.response ? error.response : localAppError;
  }
};

export const getData = async ({
  url,
  endPoints,
}: {
  url?: string;
  endPoints: string;
}) => {
  try {
    const { data } = await axios.post(`${url || base_url}${endPoints}`);
    return data;
  } catch (error: any) {
    throw error.response ? error.response : localAppError;
  }
};
