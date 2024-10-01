import { buttonPrimaryHalf } from "@/styles/common/button.css";
import {
  errorComponentText,
  errorCompponent,
} from "@/styles/components/error.css";
import Link from "next/link";

export default function Error({
  message,
  navigation,
}: {
  message?: string;
  navigation?: "main";
}) {
  return (
    <div className={errorCompponent}>
      <p className={errorComponentText}>{message}</p>
      {navigation === "main" && (
        <Link href={"/"} className={buttonPrimaryHalf}>
          메인으로
        </Link>
      )}
    </div>
  );
}
