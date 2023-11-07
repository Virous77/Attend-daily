"use server";

import { get } from "@/app/layout";
import { localAppError } from "@/utils/utils";

type GetProps = {
  url: string;
  tag: string;
};

export const getServerData = async ({ url, tag }: GetProps) => {
  const value = await get();

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${value?.value}`,
    },
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
