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
import { signupMutationOption } from "@/api/queryOptions";
import { ISignupRequest } from "@/interfaces/request";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PrevPage from "@/components/PrevPage";
import { useErrorStore } from "@/store/error.store";
import Button from "@/components/button";

export default function Page() {
  // Constants
  const maxNicknameLength = 20;
  const maxIdLength = 20;
  const maxPasswordLength = 255;

  // Router
  const router = useRouter();

  // Query Client
  const queryClient = useQueryClient();

  // Search Params
  const member = useSearchParams().get("member");

  // Mutation
  const signup = useMutation(signupMutationOption);

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Mutation Action
  const signupAction = async (formData: FormData) => {
    // Check if the form is filled
    if (
      !formData.get("nickname") ||
      !formData.get("id") ||
      !formData.get("password")
    ) {
      setError(400, "모든 항목을 입력해주세요.", "400");
      return;
    }

    // Check if the birthday is valid
    if (new Date(formData.get("birth") as string) > new Date()) {
      setError(400, "생일을 다시 확인해주세요.", "400");
      return;
    }

    // Check if the username is valid
    if (!/^[a-zA-Z0-9]*$/.test(formData.get("id") as string)) {
      setError(400, "아이디는 영어와 숫자만 입력 가능합니다.", "400");
      return;
    }

    const data: ISignupRequest = {
      nickname: formData.get("nickname") as string,
      username: formData.get("id") as string,
      password: formData.get("password") as string,
      // "yyyy-MM-dd" format
      birthDay: new Date(formData.get("birth") as string)
        .toISOString()
        .split("T")[0],
    };

    await signup.mutateAsync(data).then((res) => {
      queryClient.invalidateQueries();
      switch (res.status) {
        case 200:
          router.push(
            member ? `/auth/signin?member=${member}` : "/auth/signin",
          );
          break;
        case 400:
          setError(res.status, res.body.message, res.body.code);
          break;
        default:
          setError(res.status, "회원가입에 실패했습니다.", res.body.code);
          break;
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
              maxLength={maxNicknameLength}
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
                new Date(new Date().setFullYear(new Date().getFullYear() - 10))
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
              maxLength={maxIdLength}
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
              maxLength={maxPasswordLength}
              className={authFormInput}
            />
          </div>
          <div className={authFormButtonContainer}>
            <Button size="half" color="dark" content="완료" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
