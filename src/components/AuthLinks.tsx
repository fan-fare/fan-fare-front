import {
  activatedLink,
  authLinksContainer,
  defaultLink,
} from "@/styles/components/authLink.css";
import Link from "next/link";

/**
 * AuthLinks component
 * @param current Current page
 * @param member Member
 * @returns AuthLinks component
 */
export default function AuthLinks({
  current,
  member,
}: {
  current: "signin" | "signup";
  member: string | null;
}) {
  return (
    <div className={authLinksContainer}>
      <Link
        href={member ? `/auth/signin?member=${member}` : "/auth/signin"}
        className={current === "signin" ? activatedLink : defaultLink}
      >
        로그인
      </Link>
      <Link
        href={member ? `/auth/signup?member=${member}` : "/auth/signup"}
        className={current === "signup" ? activatedLink : defaultLink}
      >
        회원가입
      </Link>
    </div>
  );
}
