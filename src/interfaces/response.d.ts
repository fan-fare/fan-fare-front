import { CandleType } from "./candles";

export interface IFetchResponse<T = undefined | any> {
  headers: Headers;
  status: number;
  body: T;
}

export interface IResponse<T = undefined | any> {
  status: number;
  message: string;
  code: string;
  data: T | undefined;
}

export interface ISigninResponse {
  status?: number;
  message: string;
  memberUuid?: string;
  code?: string;
}

export interface ISignupResponse extends IResponse<BigInt> {}

export interface ICheckIdResponse extends IResponse<boolean> {}

export interface IGetMemberInfoResponse
  extends IResponse<{
    memberUuid: string;
    username: string;
    birthDay: string;
  }> {}

export interface ICreateMessageResponse extends IResponse<BigInt> {}

export interface IGetMessageResponse
  extends IResponse<{
    content: string;
    nickname: string;
    candleColor: CandleType;
    beforeMessageId: BigInt;
    nextMessageId: BigInt;
    createdAt: string;
    totalCount: number;
    currentCount: number;
  }> {}

export interface IGetCakeResponseMessageData {
  messageId: BigInt;
  senderNickname: string;
  candleColor: CandleType;
}

export interface IGetCakeResponse
  extends IResponse<{
    nickname: string;
    birthDay: string;
    messages: IGetCakeResponseMessageData[];
  }> {}

export interface IDeleteMessageResponse extends IResponse<string> {}

// Get Message Response by range
export interface IGetMessageResponseByRangeMessageData {
  messageId: BigInt;
  content: string;
  senderNickname: string;
  candleColor: CandleType;
  createdAt: string;
}

export interface IGetMessageResponseByRange
  extends IResponse<{
    messages: IGetMessageResponseByRangeMessageData[];
  }> {}
