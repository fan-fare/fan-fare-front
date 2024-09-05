"use client";

import AuthLinks from "@/components/AuthLinks";
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
import { buttonDarkHalf } from "@/styles/common/button.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  isExistingQueryOption,
  signupMutationOption,
} from "@/api/queryOptions";
import { ISignupRequest } from "@/interfaces/request";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PrevPage from "@/components/PrevPage";

export default function Page() {
  // Router
  const router = useRouter();

  // Search Params
  const member = useSearchParams().get("member");

  // Mutation
  const signup = useMutation(signupMutationOption);

  // Query
  const queryClient = useQueryClient();

  // Mutation Action
  const signupAction = async (formData: FormData) => {
    const data: ISignupRequest = {
      nickname: formData.get("nickname") as string,
      username: formData.get("id") as string,
      password: formData.get("password") as string,
      // "yyyy-MM-dd" format
      birthDay: new Date(formData.get("birth") as string)
        .toISOString()
        .split("T")[0],
    };

    await queryClient
      .fetchQuery(isExistingQueryOption(data.username))
      .catch(() => {
        // error handling
      });

    await signup.mutateAsync(data).then((res) => {
      if (res && res.status === 200) {
        // navigate to login page
        router.push(member ? `/auth/signin?member=${member}` : "/auth/signin");
      } else {
        // error handling
      }
    });
  };

  return (
    <div className={authPageContainer}>
      <div className={authPageWrapper}>
        <div className={prevPageContainer}>
          <PrevPage url={member ? `/${member}` : "/"} />
        </div>
          <AuthLinks current="signup" member={member} />
          <form action={signupAction} className={authForm}>
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
                defaultValue={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 10),
                  )
                    .toISOString()
                    .split("T")[0]
                }
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
      </div>
  );
}
