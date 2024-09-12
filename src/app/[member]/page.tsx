"use client";

import {
  getCakeQueryOption,
  getMemberInfoQueryOption,
} from "@/api/queryOptions";
import Cake from "@/components/Cake";
import CakeName from "@/components/CakeName";
import Effect from "@/components/Effect";
import Timer from "@/components/Timer";
import { CakeType } from "@/interfaces/cakes";
import { CandleType } from "@/interfaces/candles";
import {
  buttonPrimaryFull,
  buttonPrimaryHalf,
  buttonWhiteHalf,
  buttonWhiteLinkFull,
} from "@/styles/common/button.css";
import {
  cakePageContainer,
  pageTop,
  questionMark,
  halfButtonContainer,
  cakeContainer,
  cakePageCountContainer,
  fullButtonContainer,
  cakePageBottomContainer,
  timerContainer,
  cakeDisplay,
  cakeDisplayItem,
} from "@/styles/pages/member/memberMain.css";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function Home({ params }: { params: { member: string } }) {
  // Constants
  const candlePerCake = 5; // number of candles per cake

  // State
  const [totalCakeCount, setTotalCakeCount] = useState(1); // total cake count
  const [cakeType, setCakeType] = useState<CakeType[]>([]); // cake type
  const [currentCake, setCurrentCake] = useState(1); // current cake number
  const [totalMessageCount, setTotalMessageCount] = useState(0); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [names, setNames] = useState<string[]>([]); // name of message sender
  const [candles, setCandles] = useState<CandleType[]>([]);
  const [birthday, setBirthday] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  // Query
  const cakeInfo = useQuery(
    getCakeQueryOption(BigInt(params.member).toString(), totalCakeCount - currentCake), // reverse order of cake
  );
  const memberInfo = useQuery(getMemberInfoQueryOption());

  // Constants
  const questionMarkLink = process.env.NEXT_PUBLIC_NOTION_URL ?? "";
  const cakeList: CakeType[] = useMemo(
    () => [
      "default",
      "brown_white",
      "choco",
      "lightgreen_white",
      "matcha",
      "mint_choco",
      "orange",
      "orange_white",
      "pink_white",
      "purple_white",
      "vanilla_choco",
      "red_choco",
      "white_pink",
    ],
    [],
  );

  // Set cake type
  useEffect(() => {
    for (let i = 0; i < totalCakeCount; i++) {
      setCakeType((prev) => [
        ...prev.slice(0, i),
        cakeList[Math.floor(Math.random() * cakeList.length)],
        ...prev.slice(i + 1),
      ]);
    }
  }, [cakeList, totalCakeCount]);

  // Set current cake number
  useEffect(() => {
    const data = cakeInfo.data?.body.data;
    if (data) {
      setTotalCakeCount(data.totalCakeCount !== 0 ? data.totalCakeCount : 1);
      setTotalMessageCount(data.totalMessageCount ?? 0);
      setOwnerNickname(data.nickname ?? "빵빠레");
      // korean time
      setBirthday(new Date(`${data.birthDay}T00:00:00+09:00`));
      setNames((prev) => [
        ...prev.slice(0, (currentCake - 1) * candlePerCake),
        ...data.messageSenderNicknameList,
        ...Array.from({ length: candlePerCake - data.messageSenderNicknameList.length}).map(() => ""), // to correct the length of names array to 5
        ...prev.slice(currentCake * candlePerCake),
      ]);
      setCandles((prev) => [
        ...prev.slice(0, (currentCake - 1) * candlePerCake),
        ...data.candleColorsList,
        ...Array.from({ length: candlePerCake - data.candleColorsList.length }).map(() => "CANDLE_COLOR_1" as CandleType), // to correct the length of candles array to 5
        ...prev.slice(currentCake * candlePerCake),
      ]);
    }
  }, [cakeInfo.data, currentCake]);

  // Set logged in status
  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberId.toString() === params.member) {
      setLoggedIn(true);
    }
  }, [memberInfo.data, params.member]);

  // Set isLoaded status
  useEffect(() => {
    if (cakeInfo.data && memberInfo.data && cakeType.length > 0) {
      setIsLoaded(true);
    }
  }, [cakeInfo.data, cakeType.length, memberInfo.data]);

  // Handle scroll event
  const handleScroll = () => {
    if (pageRef.current && cakeRef.current) {
      const pageWidth = pageRef.current.offsetWidth;
      const scrollLeft = cakeRef.current.scrollLeft;
      const newCurrentCake = Math.floor(
        (scrollLeft + pageWidth / 2) / pageWidth + 1,
      );
      setCurrentCake(newCurrentCake);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <main className={cakePageContainer} ref={pageRef}>
      <Effect />
      <div className={pageTop}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
        <Link href={questionMarkLink}>
          <FaQuestionCircle className={questionMark} />
        </Link>
      </div>
      <div className={timerContainer}>
        <Timer birthday={birthday} member={params.member} loggedIn={loggedIn} />
      </div>
      <div className={cakeContainer}>
        <div className={cakeDisplay} ref={cakeRef} onScroll={handleScroll}>
          {Array.from({ length: totalCakeCount }).map((_, idx) => (
            <div
              key={idx}
              className={cakeDisplayItem}
              style={{
                left: `${idx * 100}%`,
              }}
            >
              <Cake
                cakeType={cakeType[idx]}
                candles={candles.slice(
                  idx * candlePerCake,
                  idx * candlePerCake + candlePerCake,
                )}
                names={names.slice(
                  idx * candlePerCake,
                  idx * candlePerCake + candlePerCake,
                )}
              />
            </div>
          ))}
        </div>
        <div className={cakePageCountContainer}>
          {`${currentCake} / ${totalCakeCount}`}
        </div>
      </div>
      <div className={cakePageBottomContainer}>
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
        )}
      </div>
    </main>
  );
}
