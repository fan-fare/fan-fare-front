"use client";

import {
  createPostMutationOption,
  getCakeQueryOption,
} from "@/api/queryOptions";
import PrevPage from "@/components/PrevPage";
import { CandleType } from "@/interfaces/candles";
import { ICreateMessageRequest } from "@/interfaces/request";
import { useErrorStore } from "@/store/error.store";
import {
  buttonPrimaryHalf,
  disabledButtonHalf,
} from "@/styles/common/button.css";
import {
  decoBtnContainer,
  decoMessage,
  decoPageContainer,
  decoPageWrapper,
  prevPageContainer,
} from "@/styles/pages/decoration/index.css";
import {
  decoForm,
  decoFormContainer,
  decoFormContentContainer,
  decoFormInputContainer,
  decoFormNickname,
  decoFormNicknameCount,
  decoFormTextArea,
  decoFormTextAreaCount,
} from "@/styles/pages/decoration/message.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const messageInputText = `친구 생일을 진심으로 축하해주는 당신은 멋쟁이!!\n여기에 메세지를 입력해주세요`;
  const maxNicknameLength = 5;
  const maxMessageLength = 200;
  const searchParams = useSearchParams();

  // Router
  const router = useRouter();

  // State
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Query Client
  const queryClient = useQueryClient();

  // Mutation
  const createPost = useMutation(createPostMutationOption);

  // Mutation Action
  const createPostEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const candleColor = searchParams.get("candle_type") as CandleType;
    const data: ICreateMessageRequest = {
      memberUuid: params.member,
      color: candleColor,
      content: message,
      nickname: nickname,
    };
    await createPost.mutateAsync(data).then((res) => {
      if (res && res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["cake", params.member],
        });
        queryClient.invalidateQueries({
          queryKey: ["message", "read", params.member],
        });
        router.push(`/${params.member}`);
      } else {
        setError(res.status, "메세지 전송에 실패했습니다.", res.body.message);
      }
    });
  };

  return (
    <div className={decoPageContainer}>
      <div className={decoPageWrapper}>
        <div className={prevPageContainer}>
          <PrevPage url={`/${params.member}/decoration/candle`} />
        </div>
        <div className={decoMessage}>생일을 축하해주세요!</div>
        <div className={decoFormContainer}>
          <form className={decoForm} onSubmit={createPostEvent}>
            <div className={decoFormContentContainer}>
              <div className={decoFormInputContainer}>
                <textarea
                  placeholder={messageInputText}
                  className={decoFormTextArea}
                  maxLength={maxMessageLength}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className={decoFormTextAreaCount}>
                  {message.length}/{maxMessageLength}자
                </div>
              </div>
              <div className={decoFormInputContainer}>
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요."
                  className={decoFormNickname}
                  maxLength={maxNicknameLength}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <div className={decoFormNicknameCount}>
                  {nickname.length}/{maxNicknameLength}자
                </div>
              </div>
            </div>
            <div className={decoBtnContainer}>
              <button
                type="submit"
                className={
                  nickname && message ? buttonPrimaryHalf : disabledButtonHalf
                }
              >
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
