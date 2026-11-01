import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenServer = async () => {
  const authToken = await auth.api.getToken({
    headers: await headers(),
  });
  return authToken.token;
};
