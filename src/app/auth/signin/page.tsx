"use client";

import {
  getMemberInfoQueryOption,
  signinMutationOption,
} from "@/api/queryOptions";
import AuthLinks from "@/components/AuthLinks";
import PrevPage from "@/components/PrevPage";
import { ISigninRequest } from "@/interfaces/request";
import { useErrorStore } from "@/store/error.store";
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
  // Constants
  const maxIdLength = 20;
  const maxPasswordLength = 255;

  // Query
  const queryClient = useQueryClient();
  const memberInfo = useQuery(getMemberInfoQueryOption);

  // Router
  const router = useRouter();

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Search Params
  const member = useSearchParams().get("member");
  //const redirect = useSearchParams().get("redirect");

  // Mutation
  const signin = useMutation(signinMutationOption);

  // Mutation Action
  const signinAction = async (formData: FormData) => {
    // Check if the form is filled
    if (!formData.get("id") || !formData.get("password")) {
      setError(400, "모든 항목을 입력해주세요.", "400");
      return;
    }

    const data: ISigninRequest = {
      username: formData.get("id") as string,
      password: formData.get("password") as string,
    };
    await signin.mutateAsync(data).then(async (res) => {
      switch (res.status) {
        case 200:
          queryClient.invalidateQueries({
            queryKey: ["member", "info"],
          });
          //if (redirect) {
          //  // redirect to the previous page
          //  router.push(redirect);
          //} else
          if (member) {
            // redirect to the member page
            router.push(`/${member}`);
          } else {
            // redirect to the user page
            router.push(`/${res.body.memberId}`);
          }
          break;
        case 401:
          //setError(res.status, res.body.message, res.body.code ?? "");
          setError(res.status, "아이디 또는 비밀번호가 일치하지 않습니다.", res.body.code ?? "");
          break;
        default:
          setError(res.status, "로그인에 실패했습니다.", res.body.code ?? "");
          break;
      }
    });
  };

  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberId) {
      //if (redirect) {
      //  router.push(redirect);
      //} else
      if (member) {
        router.push(`/${member}`);
      } else {
        router.push(`/${data.memberId}`);
      }
    }
  }, [memberInfo.data, router, member]);

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
            <button type="submit" className={buttonDarkHalf}>
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
