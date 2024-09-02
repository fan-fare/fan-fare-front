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
  const cakeInfo = useQuery(getCakeQueryOption(BigInt(params.member), 1));

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [totalMessageCount, setTotalMessageCount] = useState(0); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  // Message State
  const [senderNickname, setSenderNickname] = useState(""); // name of message sender
  const [message, setMessage] = useState(""); // message content
  const [date, setDate] = useState(new Date()); // message date

  // Effect
  useEffect(() => {
    const data = cakeInfo.data?.data;
    if (data) {
      setTotalMessageCount(data.totalMessageCount ?? 0);
      setOwnerNickname(data.nickname ?? "빵빠레");
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
                <div>{date.toLocaleDateString()}</div>
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
