"use client";

import { getCakeQueryOption, readMessageQueryOption } from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import {
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const preloadCount = 3; // number of messages to preload

  // Query
  const queryClient = useQueryClient();
  const cakeInfo = useQuery(getCakeQueryOption(params.member, 1));

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [messageIdList, setMessageIdList] = useState<string[]>([]); // message list
  const [totalMessageCount, setTotalMessageCount] = useState(1); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner

  // Message Content State
  const [senderNicknames, setSenderNicknames] = useState("빵빠레"); // name of message sender
  const [messages, setMessages] = useState("생일을 진심으로 축하해요!!"); // message content
  const [sendDates, setSendDates] = useState(new Date()); // message date

  // Effect
  useEffect(() => {
    const data = cakeInfo.data?.data;
    if (data && data.nickname) {
      setOwnerNickname(data.nickname ?? "빵빠레");
    }
    if (data && data.totalMessageCount) {
      setTotalMessageCount(data.totalMessageCount);
    }
    if (data && data.messageIdList) {
      setMessageIdList(data.messageIdList.map((id) => id.toString()));
    }
  }, [cakeInfo.data]);

  useEffect(() => {
    if (messageIdList.length > 0) {
      const messageIds = messageIdList.slice(0, preloadCount);
      messageIds.forEach((messageId) => {
        queryClient.prefetchQuery(readMessageQueryOption(messageId));
      });
    }
  }, [messageIdList, queryClient]);

  // Functions
  const updateMessage = useCallback(async (messageId: string) => {
    const message = await queryClient.fetchQuery(readMessageQueryOption(messageId)).then((res) => res.body.data);
    if (message) {
      setSenderNicknames(message.nickname);
      setMessages(message.content);
      setSendDates(new Date());
    }
  }, [queryClient]);

  useEffect(() => {
    console.log(messageIdList);
    if (messageIdList.length > 0) {
      updateMessage(messageIdList[0]);
    }
  }, [messageIdList, updateMessage]);

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
              <div className={messageText}>{messages}</div>
              <div className={messageInfoContainer}>
                <div>
                  {`${Math.floor(sendDates.getFullYear())
                    .toString()
                    .padStart(4, "0")}.${Math.floor(sendDates.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}.${Math.floor(sendDates.getDate())
                    .toString()
                    .padStart(2, "0")}`}
                </div>
                <div>by. {senderNicknames}</div>
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
