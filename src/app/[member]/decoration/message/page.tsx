"use client";

import { createPostMutationOption } from "@/api/queryOptions";
import Button from "@/components/button";
import PrevPage from "@/components/prevPage";
import { CandleType } from "@/interfaces/candles";
import { ICreateMessageRequest } from "@/interfaces/request";
import { useErrorStore } from "@/store/error.store";
import deco from "../decoration.module.css";
import page from "./page.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

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
    <div className={deco.decoPageContainer}>
      <div className={deco.decoPageWrapper}>
        <div className={deco.prevPageContainer}>
          <PrevPage url={`/${params.member}/decoration/candle`} />
        </div>
        <div className={deco.decoMessage}>생일을 축하해주세요!</div>
        <div className={page.decoFormContainer}>
          <form className={page.decoForm} onSubmit={createPostEvent}>
            <div className={page.decoFormContentContainer}>
              <div className={page.decoFormInputContainer}>
                <textarea
                  placeholder={messageInputText}
                  className={`${page.decoFormTextArea} formInput`}
                  maxLength={maxMessageLength}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className={page.decoFormTextAreaCount}>
                  {message.length}/{maxMessageLength}자
                </div>
              </div>
              <div className={page.decoFormInputContainer}>
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요."
                  className={`${page.decoFormNickname} formInput`}
                  maxLength={maxNicknameLength}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <div className={page.decoFormNicknameCount}>
                  {nickname.length}/{maxNicknameLength}자
                </div>
              </div>
            </div>
            <div className={deco.decoBtnContainer}>
              <Button
                type="submit"
                color="primary"
                disabled={!nickname || !message}
                size="half"
                content="완료"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
