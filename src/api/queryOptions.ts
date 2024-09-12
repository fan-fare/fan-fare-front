import { queryOptions, UseMutationOptions } from "@tanstack/react-query";
import { api } from "./fetch";
import {
  ICreateMessageRequest,
  ISigninRequest,
  ISignupRequest,
} from "@/interfaces/request";
import {
  ICreateMessageResponse,
  IDeleteMessageResponse,
  IFetchResponse,
  ISigninResponse,
  ISignupResponse,
} from "@/interfaces/response";

const normalRetryCount = 3;
const normalStaleTime = 1000 * 60 * 10;

export const isExistingQueryOption = (username: string) =>
  queryOptions({
    queryKey: ["member", "isExisting", username],
    queryFn: async () => {
      return await api.isExisting(username);
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });

export const signinMutationOption: UseMutationOptions<
  IFetchResponse<ISigninResponse>,
  Error,
  ISigninRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISigninRequest) => {
    return await api.login(data).then(({ headers, status, body }) => {
      const accessToken = headers.get("Authorization") ?? "";
      localStorage.setItem("token", accessToken);
      return { headers, status, body };
    });
  },
};

export const signupMutationOption: UseMutationOptions<
  IFetchResponse<ISignupResponse>,
  Error,
  ISignupRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISignupRequest) => {
    return await api.signup(data);
  },
};

export const getMemberInfoQueryOption = queryOptions({
  queryKey: ["member", "info"],
  queryFn: async () => {
    return await api.getMemberInfo();
  },
  retry: normalRetryCount,
});

export const getCakeQueryOption = (memberId: string, page: number) =>
  queryOptions({
    queryKey: ["cake", memberId, page],
    queryFn: async () => {
      return await api.getCake({ memberId, page });
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });

export const createPostMutationOption: UseMutationOptions<
  IFetchResponse<ICreateMessageResponse>,
  Error,
  ICreateMessageRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ICreateMessageRequest) => {
    return await api.writeMessage(data);
  },
};

export const readMessageQueryOption = (messageId: string) =>
  queryOptions({
    queryKey: ["message", "read", messageId],
    queryFn: async () => {
      return await api.readMessage(messageId);
    },
    retry: normalRetryCount,
    staleTime: normalStaleTime,
  });

export const deleteMessageMutationOption: UseMutationOptions<
  IFetchResponse<IDeleteMessageResponse>,
  Error,
  string
> = {
  retry: normalRetryCount,
  mutationFn: async (messageId: string) => {
    return await api.deleteMessage(messageId);
  },
};
