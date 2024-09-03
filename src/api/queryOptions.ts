import { queryOptions, UseMutationOptions } from "@tanstack/react-query";
import { api } from "./fetch";
import {
  ICreateMessageRequest,
  ISigninRequest,
  ISignupRequest,
} from "@/interfaces/request";
import { useUserStore } from "@/store/user.store";
import {
  ICreateMessageResponse,
  IDeleteMessageResponse,
  IFetchResponse,
  ISigninResponse1,
  ISignupResponse,
} from "@/interfaces/response";

const normalRetryCount = 3;

export const isExistingQueryOption = (username: string) =>
  queryOptions({
    queryKey: ["isExisting", username],
    queryFn: async () => {
      return await api.isExisting(username);
    },
    retry: normalRetryCount,
  });

export const signinMutationOption: UseMutationOptions<
  IFetchResponse<ISigninResponse1>,
  Error,
  ISigninRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISigninRequest) => {
    return await api.login(data).then(({ headers, status, body }) => {
      const setAccessToken = useUserStore.getState().setAccessToken;
      const accessToken = headers.get("Authorization") ?? "";
      setAccessToken(accessToken);
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

export const getCakeQueryOption = (memberId: string, page: number) => 
  queryOptions({
    queryKey: ["getCake", memberId, page],
    queryFn: async () => {
      return await api.getCake({ memberId, page }).then(({ body }) => body);
    },
    retry: normalRetryCount,
  });

export const createPostMutationOption: UseMutationOptions<
  IFetchResponse<ICreateMessageResponse>,
  Error,
  ICreateMessageRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ICreateMessageRequest) => {
    return await api.writeMessage(data)
  },
};

export const readMessageQueryOption = (messageId: string) =>
  queryOptions({
    queryKey: ["readMessage", messageId],
    queryFn: async () => {
      return await api.readMessage(messageId);
    },
    retry: normalRetryCount,
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
