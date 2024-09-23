import Cake from "@/components/Cake";
import Effect from "@/components/Effect";
import { CandleType } from "@/interfaces/candles";
import {
  buttonPinkFull,
  buttonShadow,
  buttonWhiteFull,
} from "@/styles/common/button.css";
import {
  buttonContainer,
  mainPageCakeContainer,
  mainLogoImage,
  mainPageContainer,
  mainPageInfo,
  mainPageBottomContainer,
  teamNameImage,
  teamInfoContainer,
  mainPageQuestionMark,
  mainPageBottomText,
} from "@/styles/pages/main.css";
import Image from "next/image";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";

export default function Home() {
  const candles: CandleType[] = [
    "CANDLE_COLOR_1",
    "CANDLE_COLOR_2",
    "CANDLE_COLOR_3",
    "CANDLE_COLOR_4",
    "CANDLE_COLOR_5",
  ];
  return (
    <div className={mainPageContainer}>
      <Effect main />
      <Image
        src={"/assets/happy_birthday.svg"}
        alt="happy birthday"
        width={0}
        height={0}
        className={mainLogoImage}
        loading="eager"
      />
      <div className={mainPageInfo}>
        생일을 더 특별하게, 생일 축하 롤링페이퍼
      </div>
      <div className={mainPageCakeContainer}>
        <Cake cakeType="pink_white" candles={candles} names={[]} />
      </div>
      <div className={buttonContainer}>
        <Link
          href={"/auth/signup"}
          className={`${buttonWhiteFull} ${buttonShadow}`}
        >
          🥳 회원가입하고 케이크 만들러 가기
        </Link>
        <Link
          href={"/auth/signin"}
          className={`${buttonPinkFull} ${buttonShadow}`}
        >
          🎁 로그인하고 메시지 확인하기
        </Link>
      </div>
      <div className={mainPageBottomContainer}>
        <div className={teamInfoContainer}>
          <Image
            className={teamNameImage}
            src={"/assets/team_name.svg"}
            alt="team name"
            width={0}
            height={0}
            loading="eager"
          />
          <FaQuestionCircle className={mainPageQuestionMark} />
        </div>
        <div className={mainPageBottomText}>
          광고문의: doun2008@naver.com
          <br />
          Copyright ©Fanfare. All rights reserved.
        </div>
      </div>
    </div>
  );
}
