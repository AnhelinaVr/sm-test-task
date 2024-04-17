import { fetchUsers } from "@/api/users";
import { PAGE_LIMIT } from "@/constants";
import { TPaginationProps } from "@/types";
import { TUserItem } from "@/types/users";

export const getUsers = async ({ page, limit = PAGE_LIMIT }: TPaginationProps): Promise<TUserItem[]> => {
  const res = await fetchUsers({ page, limit });
  if (!res.ok) {
    return [];
  }

  return await res.json();
};
