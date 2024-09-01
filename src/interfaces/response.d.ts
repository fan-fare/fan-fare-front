import { CandleType } from './candles';

export interface IResponse<T = undefined | any> {
  status: number;
  message: string;
  code: string;
  data: T;
}

export interface ISigninResponse {
  status?: number;
  message: string;
  code?: string;
}

export interface ICheckIdResponse extends IResponse<boolean> {}

export interface ISignupResponse extends IResponse<BigInt | undefined> {}

export interface ICreateMessageResponse extends IResponse<BigInt> {}

export interface IReadMessageResponse
  extends IResponse<{
    content: string;
    nickname: string;
    candleColor: CandleType;
    beforeMessageId: BigInt;
    nextMessageId: BigInt;
  }> {}

export interface IGetCakeResponse extends IResponse<{}> {}

export interface IDeleteMessageResponse extends IResponse<{}> {}
