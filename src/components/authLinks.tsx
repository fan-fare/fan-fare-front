import styles from "./authLink.module.css";
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
    <div className={styles.authLinksContainer}>
      <Link
        href={member ? `/auth/signin?member=${member}` : "/auth/signin"}
        className={`${styles.defaultLink} ${current === "signin" ? styles.activatedLink : ""}`}
      >
        로그인
      </Link>
      <Link
        href={member ? `/auth/signup?member=${member}` : "/auth/signup"}
        className={`${styles.defaultLink} ${current === "signup" ? styles.activatedLink : ""}`}
      >
        회원가입
      </Link>
    </div>
  );
}
