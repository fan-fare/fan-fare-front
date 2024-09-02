"use client";

import { getCakeQueryOption } from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import {
  cakePageContainer,
  cakePageCountContainer,
  pageTop,
} from "@/styles/pages/member/memberMain.css";
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
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Page({ params }: { params: { member: string } }) {
  // Query
  const cakeInfo = useQuery(getCakeQueryOption(params.member, 1));

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [totalMessageCount, setTotalMessageCount] = useState(1); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner

  // Message State
  const [senderNickname, setSenderNickname] = useState("빵빠레"); // name of message sender
  const [message, setMessage] = useState("생일을 진심으로 축하해요!!"); // message content
  const [date, setDate] = useState(new Date()); // message date

  // Effect
  useEffect(() => {
    const data = cakeInfo.data?.data;
    if (data && data.nickname) {
      setOwnerNickname(data.nickname ?? "빵빠레");
    }
    if (data && data.totalMessageCount) {
      setTotalMessageCount(data.totalMessageCount);
    }
  }, [cakeInfo.data]);

  return (
    <div className={messagePageContainer}>
      <div className={pageTop}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
      </div>
      <div className={messagePageContentContainer}>
        <div className={messageDisplayContainer}>
          <IoIosArrowBack className={navigationIcon} />
          <div className={messageContainer}>
            <div className={MessageContentContainer}>
              <div className={messageText}>{message}</div>
              <div className={messageInfoContainer}>
                <div>
                  {`${Math.floor(date.getFullYear())
                    .toString()
                    .padStart(4, "0")}.${Math.floor(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}.${Math.floor(date.getDate())
                    .toString()
                    .padStart(2, "0")}`}
                </div>
                <div>by. {senderNickname}</div>
              </div>
            </div>
          </div>
          <IoIosArrowForward className={navigationIcon} />
        </div>
        <div className={cakePageCountContainer}>
          {`${currentMessage} / ${totalMessageCount}`}
        </div>
      </div>
    </div>
  );
}
