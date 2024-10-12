"use client";

import {
  getMemberInfoQueryOption,
  signinMutationOption,
} from "@/api/queryOptions";
import AuthLinks from "@/components/authLinks";
import Button from "@/components/button";
import PrevPage from "@/components/prevPage";
import { ISigninRequest } from "@/interfaces/request";
import { useErrorStore } from "@/store/error.store";
import styles from '../auth.module.css';
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
      queryClient.invalidateQueries();
      switch (res.status) {
        case 200:
          // redirect to the user page
          router.push(`/${res.body.memberUuid}`);
          break;
        case 401:
          //setError(res.status, res.body.message, res.body.code ?? "");
          setError(
            res.status,
            "아이디 또는 비밀번호가 일치하지 않습니다.",
            res.body.code ?? "",
          );
          break;
        default:
          setError(res.status, "로그인에 실패했습니다.", res.body.code ?? "");
          break;
      }
    });
  };

  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberUuid) {
      router.push(`/${data.memberUuid}`);
    }
  }, [memberInfo.data, router, member]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.prevPageContainer}>
          <PrevPage url={member ? `/${member}` : "/"} />
        </div>
        <AuthLinks current="signin" member={member} />
        <form className={styles.authForm} action={signinAction}>
          <div className={styles.formElement}>
          </div>
          <div className={styles.formElement}>
            <label htmlFor="id" className={`${styles.authFormLabel} formLable`}>
              아이디
            </label>
            <input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요. (영어/숫자 혼합)"
              maxLength={maxIdLength}
              className={`${styles.authFormInput} formInput`}
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="password" className={`${styles.authFormLabel} formLable`}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요. (영어/숫자/특수문자 혼합)"
              maxLength={maxPasswordLength}
              className={`${styles.authFormInput} formInput`}
            />
          </div>
          <div className={styles.authFormButtonContainer}>
            <Button size="half" color="dark" content="완료" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
