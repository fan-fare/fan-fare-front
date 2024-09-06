"use client";

import { getCakeQueryOption, readMessageQueryOption } from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import Message from "@/components/Message";
import {
  cakePageCountContainer,
  pageTop,
} from "@/styles/pages/member/memberMain.css";
import {
  messageDisplay,
  messageDisplayContainer,
  messagePageContainer,
  messagePageMain,
  navigationIcon,
} from "@/styles/pages/member/message.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const preloadCount = 3; // number of messages to preload

  // Query
  const queryClient = useQueryClient();
  const cakeInfo = useQuery(getCakeQueryOption(params.member, 0));

  // Router
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [messageIdList, setMessageIdList] = useState<string[]>([]); // message list
  const [totalMessageCount, setTotalMessageCount] = useState(1); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Message Content State
  const [senderNicknames, setSenderNicknames] = useState<string[]>(["빵빠레"]); // name of message sender
  const [messages, setMessages] = useState<string[]>([
    "생일을 진심으로 축하해요!!",
  ]); // message content
  const [sendDates, setSendDates] = useState<Date[]>([new Date()]); // message date

  /* Message Content */
  // Set cake owner nickname, total message count, and message list
  useEffect(() => {
    const data = cakeInfo.data?.body.data;
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

  // Preload messages
  useEffect(() => {
    if (messageIdList.length > 0) {
      const messageIds = messageIdList.slice(
        currentMessage - preloadCount - 1,
        currentMessage + preloadCount - 1,
      );
      messageIds.forEach((messageId) => {
        queryClient.prefetchQuery(readMessageQueryOption(messageId));
      });
    }
  }, [messageIdList, currentMessage, queryClient]);

  // Update message content
  const updateMessage = useCallback(
    async (messageId: string, idx: number) => {
      if (idx !== 0 && senderNicknames[idx] && messages[idx] && sendDates[idx]) {
        return;
      }

      const message = await queryClient
        .ensureQueryData(readMessageQueryOption(messageId))
        .then((res) => {
          if (res.status === 403) {
            router.push(`/auth/signin?redirect=${pathname}`);
            return;
          } else if (res.status !== 200) {
            // error handling
          } else {
            return res.body.data;
          }
        });
      if (message) {
        setSenderNicknames((prev) => {
          prev[idx] = message.nickname;
          const newSenderNicknames = [...prev];
          return newSenderNicknames;
        });
        setMessages((prev) => {
          prev[idx] = message.content;
          const newMessages = [...prev];
          return newMessages;
        });
        setSendDates((prev) => {
          // createAt is a string in the format of "YYYY-MM-DD"
          prev[idx] = new Date(`${message.createdAt}`);
          const newSendDates = [...prev];
          return newSendDates;
        });
      }
    },
    [queryClient, router, pathname, senderNicknames, messages, sendDates],
  );

  useEffect(() => {
    if (messageIdList.length > 0) {
      updateMessage(messageIdList[currentMessage - 1], currentMessage - 1);
    }
  }, [messageIdList, currentMessage, updateMessage]);

  // Swipe left
  const swipeLeft = () => {
    if (messageRef.current && pageRef.current) {
      const pageWidth = pageRef.current.clientWidth;
      messageRef.current.scrollLeft += pageWidth;
    }
  };

  // Swipe right
  const swipeRight = () => {
    if (messageRef.current && pageRef.current) {
      const pageWidth = pageRef.current.clientWidth;
      messageRef.current.scrollLeft -= pageWidth;
    }
  };

  // On scroll, change the number of the current message based on the scroll position
  // This function is called when the user scrolls the page.
  //
  const handleScroll = () => {
    if (messageRef.current && pageRef.current) {
      // left is 1
      const pageWidth = pageRef.current.clientWidth;
      const scrollLeft = messageRef.current.scrollLeft;
      const messageCount =
        Math.floor((scrollLeft + pageWidth / 2) / pageWidth) + 1;
      setCurrentMessage(messageCount);
    }
  };

  return (
    <div className={messagePageContainer} ref={pageRef}>
      <Link className={pageTop} href={`/${params.member}`}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
      </Link>
      <div className={messagePageMain}>
        <div className={messageDisplayContainer}>
          <IoIosArrowBack
            className={navigationIcon}
            onClick={swipeRight}
            style={{ left: "0" }}
          />
          <div
            className={messageDisplay}
            ref={messageRef}
            onScroll={handleScroll}
          >
            {messageIdList.map((messageId, idx) => (
              <Message
                key={messageId}
                senderNicknames={senderNicknames[idx]}
                messages={messages[idx]}
                sendDates={sendDates[idx]}
                style={{ left: `${100 * idx}%` }}
              />
            ))}
          </div>
          <IoIosArrowForward
            className={navigationIcon}
            onClick={swipeLeft}
            style={{ right: "0" }}
          />
        </div>
        <div className={cakePageCountContainer}>
          {`${currentMessage} / ${totalMessageCount}`}
        </div>
      </div>
    </div>
  );
}
