"use client";

import Cake from "@/components/Cake";
import CakeName from "@/components/CakeName";
import Effect from "@/components/Effect";
import Timer from "@/components/Timer";
import { CandleType } from "@/interfaces/candles";
import {
  buttonPrimaryFull,
  buttonPrimaryHalf,
  buttonWhiteHalf,
  buttonWhiteLinkFull,
} from "@/styles/button.css";
import {
  cakeMessage,
  textPoint,
  cakeTitle,
  cakePageContainer,
  pageTop,
  pageTopText,
  questionMark,
  halfButtonContainer,
  cakeContainer,
  cakePageCountContainer,
  fullButtonContainer,
  cakePageBottomContainer,
} from "@/styles/pages/main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function Home({ params }: { params: { member: string } }) {
  const [currentCake, setCurrentCake] = useState(1);
  const [cakeCount, setCakeCount] = useState(14);
  const [loggedIn, setLoggedIn] = useState(false);
  const [candles, setCandles] = useState<CandleType[]>([
    "CANDLE_COLOR_1",
    "CANDLE_COLOR_2",
    "CANDLE_COLOR_3",
    "CANDLE_COLOR_4",
  ]);
  const [names, setNames] = useState([
    "이편지는영국에서전달된편지입니다",
    "누구",
    "홍길동",
    "adsfdafasf",
    "아무개",
  ]);

  const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME;
  const questionMarkLink = process.env.NEXT_PUBLIC_NOTION_URL ?? "";
  return (
    <main className={cakePageContainer}>
      <Effect />
      <div className={pageTop}>
        <CakeName />
        <Link href={questionMarkLink}>
          <FaQuestionCircle className={questionMark} />
        </Link>
      </div>
      <Timer birthday={new Date("2025-06-03T00:00:00+09:00")} />
      <div className={cakeContainer}>
        <Cake cakeType="1" candles={candles} names={names} />
        <div className={cakePageCountContainer}>
          {`${currentCake} / ${cakeCount}`}
        </div>
      </div>
      {loggedIn && (
        <div className={fullButtonContainer}>
          <Link href={"/dummy"} className={buttonWhiteLinkFull}>
            🔗 링크 공유하고 축하받기
          </Link>
          <Link href={"/decoration/candle"} className={buttonPrimaryFull}>
            🥳 사진 저장하고 자랑하기
          </Link>
        </div>
      )}
      {!loggedIn && (
        <div className={cakePageBottomContainer}>
          <div className={halfButtonContainer}>
            <Link
              href={`/auth/signin?member=${params.member}`}
              className={buttonWhiteHalf}
            >
              로그인
            </Link>
            <Link
              href={`/${params.member}/decoration/candle`}
              className={buttonPrimaryHalf}
            >
              이 케이크 꾸미기
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
