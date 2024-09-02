import { useUserStore } from "@/store/user.store";
import {
  cakeMessage,
  cakeTitle,
  pageTopText,
  textPoint,
} from "@/styles/pages/member/memberMain.css";

export default function CakeName() {
  const userName = useUserStore((state) => state.userName);
  return (
    <div className={pageTopText}>
      <div className={cakeTitle}>
        <div className={textPoint}>{userName}</div>
        🎂&apos;s cake
      </div>
      <div className={cakeMessage}>
        지금까지
        <div className={textPoint}>&nbsp;{`N`}</div>
        개의 생일축하를 받았어요!
      </div>
    </div>
  );
}
