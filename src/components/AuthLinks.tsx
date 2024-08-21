import {
  activatedLink,
  authLinksContainer,
  defaultLink,
} from '@/styles/layout.css';
import Link from 'next/link';

/**
 * AuthLinks component
 * @param current Current page
 * @returns AuthLinks component
 * @example <AuthLinks current="signin" />
 */
export default function AuthLinks({
  current,
}: {
  current: 'signin' | 'signup';
}) {
  return (
    <div className={authLinksContainer}>
      <Link
        href="/auth/signin"
        className={current === 'signin' ? activatedLink : defaultLink}
      >
        로그인
      </Link>
      <Link
        href="/auth/signup"
        className={current === 'signup' ? activatedLink : defaultLink}
      >
        회원가입
      </Link>
    </div>
  );
}
