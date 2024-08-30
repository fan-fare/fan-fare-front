'use client';

import { signinMutationOption } from '@/app/api/queryOptions';
import AuthLinks from '@/components/AuthLinks';
import { buttonDarkHalf } from '@/styles/button.css';
import {
  authPageContainer,
  authForm,
  authFormButtonContainer,
  formElement,
  authFormInput,
  authFormLabel,
} from '@/styles/pages/auth/auth.css';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  // Search Params
  const member = useSearchParams().get('member');

  // Mutation
  const signin = useMutation(signinMutationOption);

  // Mutation Action
  const signinAction = async (formData: FormData) => {
    await signin.mutateAsync(formData);
  };

  return (
    <div className={authPageContainer}>
      <AuthLinks current="signin" member={member} />
      <form className={authForm} action={signinAction}>
        <div className={formElement}>
          <label htmlFor="nickname" className={authFormLabel}>
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            className={authFormInput}
          />
        </div>
        <div className={formElement}>
          <label htmlFor="id" className={authFormLabel}>
            아이디
          </label>
          <input
            id="id"
            name="id"
            type="text"
            placeholder="아이디를 입력해주세요. (영어/숫자 혼합)"
            className={authFormInput}
          />
        </div>
        <div className={formElement}>
          <label htmlFor="password" className={authFormLabel}>
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요. (영어/숫자/특수문자 혼합)"
            className={authFormInput}
          />
        </div>
        <div className={authFormButtonContainer}>
          <button type="submit" className={buttonDarkHalf}>
            완료
          </button>
        </div>
      </form>
    </div>
  );
}
