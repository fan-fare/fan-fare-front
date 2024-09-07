"use client";

import {
  getMemberInfoQueryOption,
  signinMutationOption,
} from "@/api/queryOptions";
import AuthLinks from "@/components/AuthLinks";
import PrevPage from "@/components/PrevPage";
import { ISigninRequest } from "@/interfaces/request";
import { buttonDarkHalf } from "@/styles/common/button.css";
import {
  authPageContainer,
  authForm,
  authFormButtonContainer,
  formElement,
  authFormInput,
  authFormLabel,
  authPageWrapper,
  prevPageContainer,
} from "@/styles/pages/auth/auth.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  // Query
  const memberInfo = useQuery(getMemberInfoQueryOption());

  // Router
  const router = useRouter();

  // Search Params
  const member = useSearchParams().get("member");
  const redirect = useSearchParams().get("redirect");

  // Mutation
  const signin = useMutation(signinMutationOption);

  // Mutation Action
  const signinAction = async (formData: FormData) => {
    const data: ISigninRequest = {
      username: formData.get("id") as string,
      password: formData.get("password") as string,
    };
    await signin.mutateAsync(data).then((res) => {
      const data = res.body;
      if (res && res.status === 200) {
        if (redirect) {
          router.push(redirect);
        } else if (member) {
          router.push(`/${member}`);
        } else {
          router.push(`/${data.memberId}`);
        }
      } else if (res && res.status === 401) {
        // TODO: Show error message
        console.error("Invalid username or password");
      }
    });
  };

  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberId) {
      if (redirect) {
        router.push(redirect);
      } else if (member) {
        router.push(`/${member}`);
      } else {
        router.push(`/${data.memberId}`);
      }
    }
  }, [memberInfo.data, router, member, redirect]);

  return (
    <div className={authPageContainer}>
      <div className={authPageWrapper}>
        <div className={prevPageContainer}>
          <PrevPage url={member ? `/${member}` : "/"} />
        </div>
        <AuthLinks current="signin" member={member} />
        <form className={authForm} action={signinAction}>
          <div className={formElement}>
            {/*
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
          */}
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
    </div>
  );
}
