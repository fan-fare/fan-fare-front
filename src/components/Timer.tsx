"use client";

import {
  timer,
  timerContent,
  birthdayText,
  timerText,
  boxesImg,
  timerComponentContainer,
  clickableBoxesImg,
  timerContainer,
  textBalloon,
  endedTimerComponentContainer,
  boxesAndTimerContainer,
} from "@/styles/components/timer.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/**
 * Timer component
 * @param birthday birthday date
 * @returns Timer component
 */
export default function Timer({
  birthday,
  member,
  loggedIn,
}: {
  birthday: Date;
  member: string;
  loggedIn: boolean;
}) {
  // Contstants
  const activeDays = 7;

  // State for remains
  const [remains, setRemains] = useState(1);
  const [boxActive, setBoxActive] = useState(false);

  // Calculate remains
  const calculateRemains = useCallback(() => {
    const now = new Date();
    const nextBirthday = new Date(
      now.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );
    if (nextBirthday.getTime() < now.getTime()) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const diff = nextBirthday.getTime() - now.getTime();
    setRemains(diff);

    // If the birthday is today or the birthday has passed, set box active for a week
    if (
      diff === 0 ||
      (diff > (365 - activeDays) * 24 * 60 * 60 * 1000 && loggedIn)
    ) {
      setBoxActive(true);
    } else {
      setBoxActive(false);
    }
  }, [birthday, loggedIn]);

  // Update remains every second
  useEffect(() => {
    calculateRemains();
    const interval = setInterval(() => {
      calculateRemains();
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateRemains]);

  return (
    <div
      className={
        boxActive ? endedTimerComponentContainer : timerComponentContainer
      }
    >
      {boxActive && (
        <div className={textBalloon}>
          이제 친구들의 축하글을 열어볼 수 있어요!
          <br />
          편지는 “일주일”간 보관돼요.
        </div>
      )}
      <div className={boxesAndTimerContainer}>
        {boxActive ? (
          <Link href={`/${member}/message`}>
            <Image
              src={"/assets/boxes.svg"}
              alt="boxes"
              width={0}
              height={0}
              className={clickableBoxesImg}
            />
          </Link>
        ) : (
          <Image
            src={"/assets/boxes.svg"}
            alt="boxes"
            width={0}
            height={0}
            className={boxesImg}
          />
        )}
        {!boxActive && (
          <div className={timerContainer}>
            <div className={timer}>
              <div className={timerContent}>
                <div className={timerText}>
                  D-
                  {Math.floor(remains / (1000 * 60 * 60 * 24)) + 1}
                </div>
                <div>
                  {
                    <div className={timerText}>
                      {/* HH:MM:SS */}
                      {`${Math.floor(
                        (remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      )
                        .toString()
                        .padStart(2, "0")}:${Math.floor(
                        (remains % (1000 * 60 * 60)) / (1000 * 60),
                      )
                        .toString()
                        .padStart(2, "0")}:${Math.floor(
                        (remains % (1000 * 60)) / 1000,
                      )
                        .toString()
                        .padStart(2, "0")}`}
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className={birthdayText}>
              {`생일: ${birthday.getFullYear()}.${
                birthday.getMonth() + 1
              }.${birthday.getDate()}.`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
