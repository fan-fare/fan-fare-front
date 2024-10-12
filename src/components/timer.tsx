"use client";

import styles from "./timer.module.css";
import { getRemainingTime } from "@/utils/birthday";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/**
 * Timer component
 * @param birthday birthday date
 * @param member member
 * @param loggedIn logged in
 * @returns Timer component
 */
export default function Timer({
  birthday,
  member,
  loggedIn,
}: {
  birthday: Date | null;
  member: string;
  loggedIn: boolean;
}) {
  // Contstants
  const activeDays = 7;

  // State for remains
  const [remaningTime, setRemainingTime] = useState(1);
  const [isBirthday, setIsBirthday] = useState(false);
  const [boxActive, setBoxActive] = useState(false);

  // Calculate remains
  const calculateRemains = useCallback(() => {
    if (!birthday) {
      return;
    }
    const remaining = getRemainingTime(birthday);
    setRemainingTime(remaining);

    // If the birthday is today or the birthday has passed, set box active for a week
    if (
      remaining === 0 ||
      remaining > (365 - activeDays) * 24 * 60 * 60 * 1000
    ) {
      // Set birthday flag if the birthday is today or the birthday has passed within a week
      setIsBirthday(true);
      if (loggedIn) {
        // Set box active if the user is logged in
        setBoxActive(true);
      } else {
        // Set box inactive if the user is not logged in
        setBoxActive(false);
      }
    } else {
      // Set box inactive if the birthday is not today or the birthday has passed
      setBoxActive(false);
      setIsBirthday(false);
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

  if (boxActive && isBirthday) {
    return (
      <div
        className={`${styles.timerComponentContainer} ${styles.endedTimerComponentContainer}`}
        style={{ height: "100%" }}
      >
        <div className={styles.textBalloon}>
          이제 친구들의 축하글을 열어볼 수 있어요!
          <br />
          편지는 “일주일”간 보관돼요.
        </div>
        <Link href={`/${member}/message`}>
          <Image
            src={"/assets/boxes.svg"}
            alt="boxes"
            width={0}
            height={0}
            className={styles.clickableBoxesImg}
            loading="eager"
          />
        </Link>
      </div>
    );
  } else if (isBirthday) {
    return (
      <div className={styles.birthDayLogoContainer}>
        <Image
          src={"/assets/boxes.svg"}
          alt="boxes"
          width={0}
          height={0}
          className={styles.birthdayLogoBoxImg}
          loading="eager"
        />
        <Image
          src={"/assets/member_main_congrat_logo.svg"}
          alt="boxes"
          width={334}
          height={85}
          loading="eager"
          className={styles.birthdayLogoBackground}
        />
        <div className={styles.birthdayLogoText}>생일을 축하해주세요!</div>
        <div className={styles.birthdayText}>
          {birthday &&
            `Birthday: ${birthday.getFullYear()}.${
              birthday.getMonth() + 1
            }.${birthday.getDate()}.`}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.timerComponentContainer}>
      <div className={styles.timerContainer}>
        <Image
          src={"/assets/boxes.svg"}
          alt="boxes"
          width={0}
          height={0}
          className={styles.boxesImg}
          loading="eager"
        />
        <div className={styles.timer}>
          <div className={styles.timerContent}>
            <div className={styles.timerText}>
              D-
              {Math.floor(remaningTime / (1000 * 60 * 60 * 24)) + 1}
            </div>
            <div className={styles.timerText}>
              {/* HH:MM:SS */}
              {`${Math.floor(
                (remaningTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
              )
                .toString()
                .padStart(2, "0")}:${Math.floor(
                (remaningTime % (1000 * 60 * 60)) / (1000 * 60),
              )
                .toString()
                .padStart(2, "0")}:${Math.floor(
                (remaningTime % (1000 * 60)) / 1000,
              )
                .toString()
                .padStart(2, "0")}`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.birthdayText}>
        {birthday &&
          `Birthday: ${birthday.getFullYear()}.${
            birthday.getMonth() + 1
          }.${birthday.getDate()}.`}
      </div>
    </div>
  );
}
