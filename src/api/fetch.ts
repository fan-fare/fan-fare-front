import {
  ICreateMessageRequest,
  ISigninRequest,
  ISignupRequest,
} from "@/interfaces/request";
import {
  ICheckIdResponse,
  ICreateMessageResponse,
  IDeleteMessageResponse,
  IGetCakeResponse,
  IGetMemberInfoResponse,
  IGetMessageResponse,
  IGetMessageResponseByRange,
  ISigninResponse,
  ISignupResponse,
} from "@/interfaces/response";

// API base URL
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// API URL paths
const url = {
  isExisting: "/members/exist",
  signin: "/login",
  signup: "/signup",
  getMemberInfo: "/me",
  getCake: "/cake",
  writeMessage: "/message",
  readMessage: "/message",
  readMessageByRange: "/messages",
  deleteMessage: "/message",
};

/**
 * Custom fetch function
 * @param input url string
 * @param init fetch options
 * @param useToken token use option
 * @returns promise of json response
 */
const customFetch = async <T = unknown>(
  input: string | URL | globalThis.Request, // url string
  init?: RequestInit, // optional parameter
  useToken: boolean = false, // default to false
) => {
  let token: string | null = null;
  if (useToken) {
    token = localStorage.getItem("token");
  }
  // create a new URL object with the input string
  const url = new URL(input as string, apiBase);
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      // set the content type to application/json
      "Content-Type": "application/json",
      // set the Authorization header to the token
      // if the token is not null
      // otherwise, set it to an empty string
      Authorization: token ? `${token}` : "",
    },
    credentials: "include",
  });
  const headers = response.headers;
  const status = response.status;
  const body = (await response.json()) as T;

  return {
    headers, // pass the headers along
    status, // pass the status along
    body, // pass the body along
  };
};

/**
 * API functions
 * @returns promise of json response
 */
export const api = {
  isExisting: async (username: string) => {
    return customFetch<ICheckIdResponse>(`${url.isExisting}?id=${username}`, {
      method: "GET",
    });
  },
  login: async (data: ISigninRequest) => {
    return customFetch<ISigninResponse>(url.signin, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  signup: async (data: ISignupRequest) => {
    return customFetch<ISignupResponse>(url.signup, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getMemberInfo: async () => {
    return customFetch<IGetMemberInfoResponse>(
      url.getMemberInfo,
      {
        method: "GET",
      },
      true,
    );
  },
  getCake: async ({ memberUuid }: { memberUuid: string }) => {
    return customFetch<IGetCakeResponse>(`${url.getCake}/${memberUuid}`, {
      method: "GET",
    });
  },
  writeMessage: async (data: ICreateMessageRequest) => {
    return customFetch<ICreateMessageResponse>(`${url.writeMessage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  readMessage: async (messageId: string) => {
    return customFetch<IGetMessageResponse>(
      `${url.readMessage}/${messageId}`,
      {
        method: "GET",
      },
      true,
    );
  },
  readMessageByRange: async (
    memberUuid: string,
    start?: number,
    end?: number,
  ) => {
    let readUrl = url.readMessageByRange;
    readUrl += `?member_uuid=${memberUuid}`;
    if (start) {
      readUrl += `&start=${start}`;
    }
    if (end) {
      readUrl += `&end=${end}`;
    }
    return customFetch<IGetMessageResponseByRange>(
      readUrl,
      {
        method: "GET",
      },
      true,
    );
  },
  deleteMessage: async (messageId: string) => {
    return customFetch<IDeleteMessageResponse>(
      `${url.deleteMessage}/${messageId}`,
      {
        method: "DELETE",
      },
      true,
    );
  },
};
