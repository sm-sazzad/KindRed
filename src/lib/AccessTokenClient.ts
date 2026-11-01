import { authClient } from "./auth-client";

export const getTokenClient = async () => {
  const { data, error } = await authClient.token();
  return data?.token;
};
