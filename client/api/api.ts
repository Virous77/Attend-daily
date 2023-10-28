import axios from "axios";
import { localAppError } from "@/utils/utils";

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

type PostProps = {
  endPoints: string;
  params: any;
  token?: string;
};

export const postData = async ({
  endPoints,
  params,
  token = "",
}: PostProps) => {
  try {
    const { data } = await axios.post(`${base_url}${endPoints}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response ? error.response : localAppError;
  }
};

export const getData = async ({
  url,
  endPoints,
  token = "",
}: {
  url?: string;
  endPoints: string;
  token?: string;
}) => {
  try {
    const { data } = await axios.get(`${url || base_url}${endPoints}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    throw error.response ? error.response.data : localAppError;
  }
};

export const putData = async ({ endPoints, params, token = "" }: PostProps) => {
  try {
    const { data } = await axios.put(`${base_url}${endPoints}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response ? error.response.data : localAppError;
  }
};
