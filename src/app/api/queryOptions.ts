import { queryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from './fetch';

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

export const signupMutationOption: UseMutationOptions<void, Error, any> = {
  retry: normalRetryCount,
  mutationFn: async (data: FormData) => {
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
  { candleId: number; message: string; nickname: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ candleId, message, nickname }) => {
    await api.writeMessage({
      candleId,
      message,
      nickname,
    });
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
