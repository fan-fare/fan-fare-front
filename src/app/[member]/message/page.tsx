"use client";

import CakeName from "@/components/CakeName";
import { cakePageContainer, cakePageCountContainer, pageTop } from "@/styles/pages/member/memberMain.css";
import {
  MessageContentContainer,
  messageContainer,
  messageDisplayContainer,
  messageInfoContainer,
  messagePageContainer,
  messagePageContentContainer,
  messageText,
  navigationIcon,
} from "@/styles/pages/member/message.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Page() {
  const message = "생일축하해!";
  const date = new Date();
  const nickname = "nickname";
  const currentMessage = 1;
  const messageCount = 14;
  return (
    <div className={messagePageContainer}>
      <div className={pageTop}>
        <CakeName />
      </div>
      <div className={messagePageContentContainer}>
        <div className={messageDisplayContainer}>
          <IoIosArrowBack className={navigationIcon} />
          <div className={messageContainer}>
            <div className={MessageContentContainer}>
              <div className={messageText}>{message}</div>
              <div className={messageInfoContainer}>
                <div>{date.toLocaleDateString()}</div>
                <div>by. {nickname}</div>
              </div>
            </div>
          </div>
          <IoIosArrowForward className={navigationIcon} />
        </div>
        <div className={cakePageCountContainer}>
          {`${currentMessage} / ${messageCount}`}
        </div>
      </div>
    </div>
  );
}
