import AuthLinks from '@/components/AuthLinks';
import PrevPage from '@/components/PrevPage';
import { buttonDarkHalf } from '@/styles/button.css';
import {
  authPageContainer,
  authForm,
  authFormButtonContainer,
  formElement,
  authFormInput,
  authFormLabel,
} from '@/styles/pages/auth/auth.css';

export default function Page() {
  return (
    <PrevPage url="/">
      <div className={authPageContainer}>
        <AuthLinks current="signin" />
        <form action="POST" className={authForm}>
          <div className={formElement}>
            <label htmlFor="nickname" className={authFormLabel}>
              닉네임
            </label>
            <input
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
    </PrevPage>
  );
}
