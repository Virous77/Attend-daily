"use server";

import { get } from "@/app/layout";
import { localAppError } from "@/utils/utils";

type GetProps = {
  endpoint: string;
  tag: string;
};

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getServerData = async ({ endpoint, tag }: GetProps) => {
  const value = await get();

  const res = await fetch(`${base_url}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${value?.value}`,
    },
    cache: "no-cache",
    next: { tags: [tag] },
  });

  const data = await res.json();
  if (typeof data.status !== "boolean") {
    return (
      { data: null, message: data.message, status: false } || localAppError.data
    );
  }
  return data;
};

export const putServerData = async ({
  endpoint,
  params,
}: {
  params: any;
  endpoint: string;
}) => {
  const value = await get();

  const res = await fetch(`${base_url}${endpoint}`, {
    method: "put",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${value?.value}`,
    },
  });

  const data = await res.json();
  if (typeof data.status !== "boolean") {
    return (
      { data: null, message: data.message, status: false } || localAppError.data
    );
  }
  return data;
};
