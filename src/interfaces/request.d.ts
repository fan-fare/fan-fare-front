import { CandleType } from "./candles";

export interface ISigninRequest {
  username: string;
  password: string;
}

export interface ISignupRequest {
  nickname: string;
  username: string;
  password: string;
  birthDay: string;
}

export interface ICreateMessageRequest {
  memberUuid: string;
  color: CandleType;
  content: string;
  nickname: string;
}
