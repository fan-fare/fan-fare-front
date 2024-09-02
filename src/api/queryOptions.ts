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
  ISigninResponse,
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
  void | ISigninResponse,
  Error,
  ISigninRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISigninRequest) => {
    return await api.login(data).then(({ headers, body }) => {
      const setAccessToken = useUserStore.getState().setAccessToken;
      const accessToken = headers.get("Authorization") ?? "";
      setAccessToken(accessToken);
      return body;
    });
  },
};

export const signupMutationOption: UseMutationOptions<
  void | ISignupResponse,
  Error,
  ISignupRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISignupRequest) => {
    return await api.signup(data).then(({ body }) => body);
  },
};

export const getCakeQueryOption = (memberId: BigInt, page: number) => {
  queryOptions({
    queryKey: ["getCake", memberId, page],
    queryFn: async () => {
      return await api.getCake({ memberId, page }).then(({ body }) => body);
    },
    retry: normalRetryCount,
  });
};

export const createPostMutationOption: UseMutationOptions<
  void | ICreateMessageResponse,
  Error,
  ICreateMessageRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ICreateMessageRequest) => {
    return await api.writeMessage(data).then(({ body }) => body);
  },
};

export const readMessageQueryOption = (messageId: BigInt) => {
  queryOptions({
    queryKey: ["readMessage", messageId],
    queryFn: async () => {
      return await api.readMessage(messageId);
    },
    retry: normalRetryCount,
  });
};

export const deleteMessageMutationOption: UseMutationOptions<
  void | IDeleteMessageResponse,
  Error,
  BigInt
> = {
  retry: normalRetryCount,
  mutationFn: async (messageId: BigInt) => {
    return await api.deleteMessage(messageId).then(({ body }) => body);
  },
};
