import { UseMutationOptions } from '@tanstack/react-query';
import { api } from './fetch';

const normalRetryCount = 3;

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

export const createPostMutationOption: UseMutationOptions<
  void,
  Error,
  { candleId: number; message: string; nickname: string }
> = {
  retry: normalRetryCount,
  mutationFn: async ({ candleId, message, nickname }) => {
    await api.createPost({
      candleId,
      message,
      nickname,
    });
  },
};
