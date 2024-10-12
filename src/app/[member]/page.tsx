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
import page from "./page.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import cofetti from "canvas-confetti";
import Error from "@/components/Error";
import { IGetCakeResponseMessageData } from "@/interfaces/response";
import { isNotPassedOneWeek } from "@/utils/birthday";
import Button from "@/components/button";

export default function Home({ params }: { params: { member: string } }) {
  // Constants
  const candlePerCake = 5; // number of candles per cake

  // Query Client
  const queryClient = useQueryClient();

  // State
  const [totalCakeCount, setTotalCakeCount] = useState(1); // total cake count
  const [cakeType, setCakeType] = useState<CakeType[]>([]); // cake type
  const [currentCake, setCurrentCake] = useState(1); // current cake number
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<IGetCakeResponseMessageData[]>([]);
  const [openMessageOnClick, setOpenMessageOnClick] = useState(false);

  // Refs
  const pageButtomRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  // Query
  const cakeInfo = useQuery(getCakeQueryOption(params.member));
  const memberInfo = useQuery(getMemberInfoQueryOption);

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
      setTotalCakeCount(
        Math.max(Math.ceil(data.messages.length / candlePerCake), 1), // at least 1 cake to show the cake
      );
      setMessages(data.messages);
      setOwnerNickname(data.nickname ?? "빵빠레");
      // korean time
      setBirthday(new Date(`${data.birthDay}T00:00:00+09:00`));
    }
  }, [cakeInfo.data, currentCake]);

  // Set logged in status
  useEffect(() => {
    const data = memberInfo.data?.body.data;
    if (data && data.memberUuid.toString() === params.member) {
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

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    window.alert("링크가 복사되었습니다.");
  }, []);

  const handleCapture = useCallback(async () => {
    if (pageButtomRef.current) {
      pageButtomRef.current.style.display = "none";
      html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "cake.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
      pageButtomRef.current.style.display = "flex";
    }
  }, []);

  // Confetti effect
  useEffect(() => {
    if (isLoaded && cakeInfo.data && cakeInfo.data.status === 200) {
      const canvas = document.createElement("canvas");
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "-100";
      document.body.appendChild(canvas);

      const confetti = cofetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      confetti({
        particleCount: 100,
        spread: 70,
      });
    }
  }, [cakeInfo.data, isLoaded]);

  // Switch can open message
  useEffect(() => {
    if (loggedIn && birthday) {
      // can open message for one week after birthday
      if (isNotPassedOneWeek(birthday)) {
        setOpenMessageOnClick(true);
      } else {
        setOpenMessageOnClick(false);
      }
    } else {
      setOpenMessageOnClick(false);
    }
  }, [birthday, loggedIn]);

  // log out event
  const logout = useCallback(() => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    queryClient.invalidateQueries();
  }, [queryClient]);

  if (!isLoaded) {
    return null;
  } else if (isLoaded && cakeInfo.data && cakeInfo.data.status !== 200) {
    return <Error message="케이크가 존재하지 않습니다." navigation="main" />;
  }

  if (!cakeInfo.data || !memberInfo.data) {
    return <></>;
  }

  return (
    <div className={page.cakePageWrapper}>
      <Effect />
      <div className={page.cakePageContainer} ref={pageRef}>
        <div className={page.pageTop}>
          <CakeName userName={ownerNickname} messageCount={messages.length} />
          <Link href={questionMarkLink}>
            <Image
              src={"/assets/question-mark.svg"}
              alt="question-mark"
              width={40}
              height={40}
              className={"questionMark"}
              loading="eager"
            />
          </Link>
        </div>
        <div className={page.timerContainer}>
          <Timer
            birthday={birthday}
            member={params.member}
            loggedIn={loggedIn}
          />
        </div>
        <div className={page.cakeContainer}>
          <div
            className={page.cakeDisplay}
            ref={cakeRef}
            onScroll={handleScroll}
          >
            {Array.from({ length: totalCakeCount }).map((_, idx) => (
              <div
                key={idx}
                className={page.cakeDisplayItem}
                style={{
                  left: `${idx * 100}%`,
                }}
              >
                <Cake
                  cakeType={cakeType[idx]}
                  candles={messages
                    .slice(
                      idx * candlePerCake,
                      idx * candlePerCake + candlePerCake,
                    )
                    .map((message) => message.candleColor as CandleType)}
                  names={messages
                    .slice(
                      idx * candlePerCake,
                      idx * candlePerCake + candlePerCake,
                    )
                    .map((message) => message.senderNickname)}
                  memberUuid={params.member}
                  cakeIndex={idx}
                  openMessageOnClick={openMessageOnClick}
                />
              </div>
            ))}
          </div>
          <div className={page.cakePageCountContainer}>
            {`${currentCake} / ${totalCakeCount}`}
          </div>
        </div>
      </div>
      <div className={page.cakePageBottomContainer} ref={pageButtomRef}>
        {loggedIn && (
          <div className={page.fullButtonContainer}>
            <Button
              onClick={handleCopyLink}
              content="🔗 링크 공유하고 축하받기"
              color="white-link"
              size="full"
            />
            <Button
              content="🥳 사진 저장하고 자랑하기"
              color="primary"
              size="full"
              onClick={handleCapture}
            />
          </div>
        )}
        {!loggedIn && (
          <div className={page.halfButtonContainer}>
            <Button
              content="👀 내 케이크 보러가기"
              color="white"
              size="half"
              href={`/auth/signin?member=${params.member}`}
            />
            <Button
              content="🪄 이 케이크 꾸미기"
              color="primary"
              size="half"
              href={`/${params.member}/decoration/candle`}
            />
          </div>
        )}
        <div className={page.logoutButtonContainer}>
          {loggedIn && (
            <div
              className={page.logoutButton}
              onClick={logout}
              onTouchEnd={logout}
            >
              logout&nbsp;
              <Image
                src={"/assets/logout.svg"}
                alt="logout"
                loading="eager"
                width={9}
                height={9}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
