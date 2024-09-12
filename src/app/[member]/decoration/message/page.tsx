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
  decoFormInputContainer,
  decoFormNickname,
  decoFormTextArea,
} from "@/styles/pages/decoration/message.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const messageInputText = `친구 생일을 진심으로 축하해주는 당신은 멋쟁이!!\n여기에 메세지를 입력해주세요`;
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
      memberId: params.member,
      color: candleColor,
      content: message,
      nickname: nickname,
    };
    await createPost.mutateAsync(data).then((res) => {
      if (res && res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["cake"],
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
            <div className={decoFormInputContainer}>
              <textarea
                placeholder={messageInputText}
                className={decoFormTextArea}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                className={decoFormNickname}
                onChange={(e) => setNickname(e.target.value)}
              />
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
