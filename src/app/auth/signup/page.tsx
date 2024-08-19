'use client';

import AuthLinks from '@/components/AuthLinks';
import {
  authPageContainer,
  authForm,
  authFormButtonContainer,
  formElement,
  authFormInput,
  authFormLabel,
} from '@/styles/pages/auth/auth.css';
import { buttonDarkHalf } from '@/styles/button.css';
import { FormEvent } from 'react';
import { authApi } from '@/app/api/fetch';

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const response = await authApi.signup(formData);
  }

  return (
    <div className={authPageContainer}>
      <AuthLinks current="signup" />
      <form action="" className={authForm}>
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
          <label htmlFor="birth" className={authFormLabel}>
            생일
          </label>
          <input
            id="birth"
            name="birth"
            type="date"
            placeholder="생일을 입력해주세요."
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
