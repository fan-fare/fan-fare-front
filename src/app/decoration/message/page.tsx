'use client';

import { createPostMutationOption } from '@/app/api/queryOptions';
import PrevPage from '@/components/PrevPage';
import { buttonPrimaryHalf, disabledButtonHalf } from '@/styles/button.css';
import {
  decoForm,
  decoFormNickname,
  decoFormTextArea,
  decoMessage,
  decoPageContainer,
  decoFormInputContainer,
  decoBtnContainer,
} from '@/styles/pages/decoration/decoration.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
  // Constants
  const messageInputText = `친구 생일을 진심으로 축하해주는 당신은 멋쟁이!!\n여기에 메세지를 입력해주세요`;
  const searchParams = useSearchParams();

  // Router
  const router = useRouter();

  // State
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  // Mutation
  const createPost = useMutation(createPostMutationOption);

  // Mutation Action
  const createPostEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const candleId = Number(searchParams.get('candle_id'));
    await createPost.mutateAsync({
      candleId,
      message,
      nickname,
    });
    router.push('/');
  };

  return (
    <PrevPage url="/decoration/candle">
      <div className={decoPageContainer}>
        <div className={decoMessage}>생일을 축하해주세요!</div>
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
    </PrevPage>
  );
}
