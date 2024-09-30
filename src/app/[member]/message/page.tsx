"use client";

import {
  getCakeQueryOption,
  readMessageByRangeQueryOption,
  readMessageQueryOption,
} from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import Message from "@/components/Message";
import { IGetMessageResponseByRangeMessageData } from "@/interfaces/response";
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
  const preloadCount = 3; // number of messages to preload
  const loginErrorMessage = "로그인이 필요합니다.";
  const readErrorMessage = "메세지를 읽어오는 데 실패했습니다.";

  // Search parameters
  const searchParams = useSearchParams();
  const defaultMessageNumber = parseInt(searchParams.get("default") ?? "1");

  // Router
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [currentMessage, setCurrentMessage] = useState(1); // current message number
  const [totalMessageCount, setTotalMessageCount] = useState(0); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [messagesByRange, setMessagesByRange] = useState<
    IGetMessageResponseByRangeMessageData[]
  >([]);
  const [messagesPreloaded, setmessagesPreloaded] = useState(false);

  // Query
  const queryClient = useQueryClient();
  const cakeInfo = useQuery(getCakeQueryOption(params.member, 0));

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  /* Message Content */
  // Set total message count and owner nickname
  useEffect(() => {
    if (cakeInfo.data?.body.data) {
      setTotalMessageCount(cakeInfo.data.body.data.totalMessageCount);
      setOwnerNickname(cakeInfo.data.body.data.nickname);
    }
  }, [cakeInfo.data?.body.data]);

  // Set initial messages when cake info is loaded
  useEffect(() => {
    const cakeInfoData = cakeInfo.data?.body.data;
    if (cakeInfoData) {
      const totalMessageCount = cakeInfoData.totalMessageCount;
      const messageStartNumber = Math.max(
        0,
        defaultMessageNumber - (preloadCount - 1) / 2,
      );
      const messageEndNumber = Math.min(
        totalMessageCount - 1,
        defaultMessageNumber + (preloadCount - 1) / 2,
      );
      const defaultMessage: IGetMessageResponseByRangeMessageData = {
        messageId: BigInt(1),
        content: "",
        senderNickname: "",
        candleColor: "CANDLE_COLOR_1",
        createdAt: "2024-09-30",
      };

      // set dummy message list
      let defaultMessageList: IGetMessageResponseByRangeMessageData[] = [];
      defaultMessageList.length = totalMessageCount;
      defaultMessageList.fill(defaultMessage);

      // query to load some data
      queryClient
        .ensureQueryData(
          readMessageByRangeQueryOption(
            params.member,
            messageStartNumber,
            messageEndNumber,
          ),
        )
        .then((res) => {
          // throw error if status is not 200
          if (res.status === 403) {
            setError(res.status, loginErrorMessage, res.body.code);
            router.push(`/auth/signin?redirect=${pathname}`);
          } else if (res.status !== 200) {
            setError(res.status, readErrorMessage, res.body.code);
            router.push(`/${params.member}`);
          } else {
            // if status is 200 load data to state
            const loadedMessageData = res.body.data?.messages;
            if (loadedMessageData) {
              let newMessageList = [
                ...defaultMessageList.slice(0, messageStartNumber),
                ...loadedMessageData,
                ...defaultMessageList.slice(messageEndNumber - 1),
              ];
              setMessagesByRange(newMessageList);
            }
          }
        })
        .finally(() => {
          setmessagesPreloaded(true);
        });
    }
  }, [
    cakeInfo.data,
    defaultMessageNumber,
    params.member,
    pathname,
    queryClient,
    router,
    setError,
  ]);

  // Load all messages
  useEffect(() => {
    const cakeInfoData = cakeInfo.data?.body.data;
    // if message is preloaded and cake info is loaded run query
    if (cakeInfoData && messagesPreloaded) {
      queryClient
        .ensureQueryData(readMessageByRangeQueryOption(params.member))
        .then((res) => {
          if (res.status === 403) {
            setError(res.status, loginErrorMessage, res.body.code);
            router.push(`/auth/signin?redirect=${pathname}`);
            return;
          } else if (res.status !== 200) {
            setError(res.status, readErrorMessage, res.body.code);
            router.push(`/${params.member}`);
            return;
          } else {
            const messageData = res.body.data?.messages;
            if (messageData) {
              setMessagesByRange(messageData);
            }
          }
        });
    }
  }, [
    cakeInfo.data?.body.data,
    messagesPreloaded,
    params.member,
    pathname,
    queryClient,
    router,
    setError,
  ]);

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

  // Change the current message number based on messageNumber
  useEffect(() => {
    if (
      defaultMessageNumber &&
      messageRef.current &&
      messagesByRange.length > 0
    ) {
      const messageNumber = defaultMessageNumber;
      setCurrentMessage(messageNumber);
      messageRef.current.scrollLeft =
        (messageNumber - 1) * messageRef.current.clientWidth;
    }
  }, [defaultMessageNumber, messagesByRange.length]);

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
            {messagesByRange.map((message, idx) => (
              <Message
                key={idx}
                senderNicknames={message.senderNickname}
                messages={message.content}
                sendDates={new Date(message.createdAt)}
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
