import { queryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from './fetch';
import { ICreateMessageRequest, ISignupRequest } from '@/interfaces/request';

const normalRetryCount = 3;

export const isExistingQueryOption = (id: BigInt) => {
  queryOptions({
    queryKey: ['isExisting', id],
    queryFn: async () => {
      return await api.isExisting(id)
    },
    retry: normalRetryCount,
  });
}

export const signinMutationOption: UseMutationOptions<void, Error, FormData> = {
  retry: normalRetryCount,
  mutationFn: async (data: FormData) => {
    await api.login(data);
  },
};

export const signupMutationOption: UseMutationOptions<void, Error, ISignupRequest> = {
  retry: normalRetryCount,
  mutationFn: async (data: ISignupRequest) => {
    await api.signup(data);
  },
};

export const getCakeQueryOption = (memberId: BigInt, page: number) => {
  queryOptions({
    queryKey: ['getCake', memberId, page],
    queryFn: async () => {
      return await api.getCake({ memberId, page });
    },
    retry: normalRetryCount,
  });
}

export const createPostMutationOption: UseMutationOptions<
  void,
  Error,
  ICreateMessageRequest
> = {
  retry: normalRetryCount,
  mutationFn: async (data: ICreateMessageRequest) => {
    await api.writeMessage(data);
  },
};

export const readMessageQueryOption = (messageId: BigInt) => {
  queryOptions({
    queryKey: ['readMessage', messageId],
    queryFn: async () => {
      return await api.readMessage(messageId);
    },
    retry: normalRetryCount,
  });
}

export const deleteMessageMutationOption: UseMutationOptions<void, Error, BigInt> = {
  retry: normalRetryCount,
  mutationFn: async (messageId: BigInt) => {
    await api.deleteMessage(messageId);
  },
};
