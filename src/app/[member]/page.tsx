"use client";

import {
  getCakeQueryOption,
  getMemberInfoQueryOption,
} from "@/api/queryOptions";
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
} from "@/styles/pages/member/memberMain.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function Home({ params }: { params: { member: string } }) {
  // Query
  const cakeInfo = useQuery(
    getCakeQueryOption(BigInt(params.member).toString(), 0),
  );
  const memberInfo = useQuery(getMemberInfoQueryOption());

  // State
  const [totalCakeCount, setTotalCakeCount] = useState(1); // total cake count
  const [currentCake, setCurrentCake] = useState(1); // current cake number
  const [totalMessageCount, setTotalMessageCount] = useState(0); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [names, setNames] = useState<string[]>([]); // name of message sender
  const [candles, setCandles] = useState<CandleType[]>([]);
  const [birthday, setBirthday] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );
  const [loggedIn, setLoggedIn] = useState(false);

  // Constants
  const questionMarkLink = process.env.NEXT_PUBLIC_NOTION_URL ?? "";

  // Set current cake number
  useEffect(() => {
    const data = cakeInfo.data?.body.data;
    if (data) {
      setTotalCakeCount(data.totalCakeCount !== 0 ? data.totalCakeCount : 1);
      setTotalMessageCount(data.totalMessageCount ?? 0);
      setOwnerNickname(data.nickname ?? "빵빠레");
      // korean time
      setBirthday(new Date(`${data.birthDay}T00:00:00+09:00`));
      setNames(data.messageSenderNicknameList);
      setCandles(data.candleColorsList);
    }
  }, [cakeInfo.data]);

  // Set logged in status
  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberId.toString() === params.member) {
      setLoggedIn(true);
    }
  }, [memberInfo.data, params.member]);

  return (
    <main className={cakePageContainer}>
      <Effect />
      <div className={pageTop}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
        <Link href={questionMarkLink}>
          <FaQuestionCircle className={questionMark} />
        </Link>
      </div>
      <Timer birthday={birthday} member={params.member} loggedIn={loggedIn} />
      <div className={cakeContainer}>
        <Cake cakeType="1" candles={candles} names={names} />
        <div className={cakePageCountContainer}>
          {`${currentCake} / ${totalCakeCount}`}
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
