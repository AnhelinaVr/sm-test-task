import { USERS_URL } from "@/constants";
import { TPaginationProps } from "@/types";

export const fetchUsers = async ({
  page,
  limit,
  url = USERS_URL,
}: TPaginationProps & { url?: string }): Promise<Response> => {
  return await fetch(`${url}?page=${page}&limit=${limit}`, { method: "GET" });
};

export const fetchUsersCount = async ({ url = USERS_URL }): Promise<Response> => {
  return await fetch(`${url}/count`, { method: "GET" });
};
