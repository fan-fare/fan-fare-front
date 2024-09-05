import { cakeMessage, cakeNameContainer, cakeTitle, textPoint } from "@/styles/components/cakeName.css";
import {
} from "@/styles/pages/member/memberMain.css";

export default function CakeName({
  userName,
  messageCount,
}: {
  userName: string;
  messageCount: number;
}) {
  return (
    <div className={cakeNameContainer}>
      <div className={cakeTitle}>
        <div className={textPoint}>{userName}</div>
        🎂&apos;s cake
      </div>
      <div className={cakeMessage}>
        지금까지
        <div className={textPoint}>&nbsp;{messageCount}</div>
        개의 생일축하를 받았어요!
      </div>
    </div>
  );
}
