"use server";

import { revalidateTag } from "next/cache";

export const invalidateServerQuery = async (tag: string) => {
  revalidateTag("collection");
};
