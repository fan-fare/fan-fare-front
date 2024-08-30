import { CandleType } from "./candles";

export interface ISignupRequest {
  nickname: string;
  username: string;
  password: string;
  birthday: Date;
}

export interface ICreateMessageRequest {
  memberId: BigInt;
  color: CandleType;
  content: string;
  nickname: string;
}