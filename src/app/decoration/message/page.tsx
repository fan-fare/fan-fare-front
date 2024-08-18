'use client';

import PrevPage from '@/components/PrevPage';
import { buttonPrimaryHalf, buttonGrayHalf } from '@/styles/button.css';
import {
  decoButtonContainer,
  decoForm,
  decoFormNickname,
  decoFormTextArea,
  decoMessage,
  decoPageContainer,
} from '@/styles/pages/decoration/decoration.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const messageInputText = `친구 생일을 진심으로 축하해주는 당신은 멋쟁이!!\n여기에 메세지를 입력해주세요`;

  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  return (
    <PrevPage url="/decoration/candle">
      <div className={decoPageContainer}>
        <div className={decoMessage}>생일을 축하해주세요!</div>
        <form action="" className={decoForm}>
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
        </form>
        <div className={decoButtonContainer}>
          <Link
            href="/"
            className={nickname && message ? buttonPrimaryHalf : buttonGrayHalf}
          >
            완료
          </Link>
        </div>
      </div>
    </PrevPage>
  );
}
