"use client";

import { getCakeQueryOption, readMessageQueryOption } from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import Message from "@/components/Message";
import { useErrorStore } from "@/store/error.store";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const messagePerCake = 5; // number of messages per cake
  const preloadCount = 3; // number of messages to preload
  const loginErrorMessage = "로그인이 필요합니다.";
  const readErrorMessage = "메세지를 읽어오는 데 실패했습니다.";

  // Search parameters
  const searchParams = useSearchParams();
  const defaultNumber = searchParams.get("default");

  // Router
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [messageIdList, setMessageIdList] = useState<string[]>([]); // message list
  const [totalMessageCount, setTotalMessageCount] = useState(1); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [currentCakeCount, setCurrentCakeCount] = useState(1); // current cake number

  // Query
  const queryClient = useQueryClient();
  const cakeInfo = useQuery(
    getCakeQueryOption(params.member, currentCakeCount - 1),
  );

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Message Content State
  const [senderNicknames, setSenderNicknames] = useState<string[]>([]); // name of message sender
  const [messages, setMessages] = useState<string[]>([]);
  const [sendDates, setSendDates] = useState<Date[]>([]); // message date

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
      // Set message list
      setMessageIdList((prev) => [
        ...prev.slice(0, (currentCakeCount - 1) * messagePerCake),
        ...data.messageIdList.map((id) => id.toString()),
        ...prev.slice(currentCakeCount * messagePerCake),
      ]);
    }
  }, [cakeInfo.data, currentCakeCount]);

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
      const message = await queryClient
        .ensureQueryData(readMessageQueryOption(messageId))
        .then((res) => {
          if (res.status === 403) {
            router.push(`/auth/signin?redirect=${pathname}`);
            setError(res.status, loginErrorMessage, res.body.code);
            return;
          } else if (res.status !== 200) {
            setError(res.status, readErrorMessage, res.body.code);
            router.push(`/${params.member}`);
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
    [pathname, queryClient, router, setError, params.member],
  );

  // Update message content when the current message number changes
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

  // Change the current cake number based on the current message number
  useEffect(() => {
    if (currentMessage % messagePerCake === 0) {
      setCurrentCakeCount(currentMessage / messagePerCake + 1);
    }
  }, [currentMessage]);

  // Change the current message number based on messageNumber
  useEffect(() => {
    if (defaultNumber && messageRef.current && messageIdList.length > 0) {
      const messageNumber = parseInt(defaultNumber);
      setCurrentMessage(messageNumber);
      messageRef.current.scrollLeft =
        (messageNumber - 1) * messageRef.current.clientWidth;
    }
  }, [defaultNumber, messageIdList]);

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
