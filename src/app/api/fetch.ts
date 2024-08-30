import { ICreateMessageRequest } from '@/interfaces/request';
import {
  ICheckIdResponse,
  IReadMessageResponse,
  ISignupResponse,
} from '@/interfaces/response';

// API base URL
const apiBase = process.env.API_URL;

// API URL paths
const url = {
  isExisting: '/members/exist',
  signin: '/login',
  signup: '/signup',
  getCake: '/cake',
  writeMessage: '/message',
  readMessage: '/message',
  deleteMessage: '/message',
};

/**
 * Custom fetch function
 * @param input url string
 * @param init fetch options
 * @returns promise of json response
 */
const customFetch = async <T = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  // create a new URL object with the input string
  const url = new URL(input as string, apiBase);
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      // set the content type to application/json
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<T>;
};

/**
 * API functions
 * @returns promise of json response
 */
export const api = {
  isExisting: async (id: BigInt) => {
    return await customFetch<ICheckIdResponse>(`${url.isExisting}?id=${id}`, {
      method: 'GET',
    });
  },
  login: async (data: FormData) => {
    return await customFetch<{}>(url.signin, {
      method: 'POST',
      body: data,
    });
  },
  signup: async (data: FormData) => {
    return await customFetch<ISignupResponse>(url.signup, {
      method: 'POST',
      body: data,
    });
  },
  getCake: async ({ memberId, page }: { memberId: BigInt; page: number }) => {
    return await customFetch<{}>(`${url.getCake}/${memberId}?page=${page}`, {
      method: 'GET',
    });
  },
  writeMessage: async ({
    candleId,
    message,
    nickname,
  }: {
    candleId: number;
    message: string;
    nickname: string;
  }) => {
    return await customFetch<ICreateMessageRequest>('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candleId, message, nickname }),
    });
  },
  readMessage: async (messageId: BigInt) => {
    return await customFetch<IReadMessageResponse>(
      `${url.readMessage}/${messageId}`,
      {
        method: 'GET',
      }
    );
  },
  deleteMessage: async (messageId: BigInt) => {
    return await customFetch<{}>(`${url.deleteMessage}/${messageId}`, {
      method: 'DELETE',
    });
  },
};
