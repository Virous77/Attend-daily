import axios from "axios";

const base_url = "http://localhost:4000/api/v1";

type PostProps = {
  endPoints: string;
  params: any;
};

export const postData = async ({ endPoints, params }: PostProps) => {
  try {
    const { data } = await axios.post(`${base_url}${endPoints}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
