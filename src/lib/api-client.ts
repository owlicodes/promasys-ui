import Axios, { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";

    const session = await getSession();
    if (session?.user.access_token) {
      config.headers.Authorization = `Bearer ${session.user.access_token}`;
    }
  }

  return config;
}

export const api = Axios.create({
  // eslint-disable-next-line n/no-process-env
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
