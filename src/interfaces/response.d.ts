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
  memberId?: number;
  code?: string;
}

export interface ISignupResponse extends IResponse<BigInt> {}

export interface ICheckIdResponse extends IResponse<boolean> {}

export interface IGetMemberInfoResponse extends IResponse<{
  memberId: number;
  username: string;
  birthDay: string;
}> {}

export interface ICreateMessageResponse extends IResponse<BigInt> {}

export interface IReadMessageResponse
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

export interface IGetCakeResponse
  extends IResponse<{
    totalMessageCount: number;
    nickname: string;
    birthDay: string;
    totalCakeCount: number;
    messageIdList: BigInt[];
    messageSenderNicknameList: string[];
    candleColorsList: CandleType[];
  }> {}

export interface IDeleteMessageResponse extends IResponse<string> {}
