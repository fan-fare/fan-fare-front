"use client";

import { getCakeQueryOption, readMessageQueryOption } from "@/api/queryOptions";
import CakeName from "@/components/CakeName";
import { fullScreenContainer } from "@/styles/common/common.css";
import {
  cakePageCountContainer,
  pageTop,
} from "@/styles/pages/member/memberMain.css";
import {
  messageContentContainer,
  messageContainer,
  messageDisplayContainer,
  messageInfoContainer,
  messagePageContainer,
  messagePageContentContainer,
  messageText,
  navigationIcon,
  fullWhiteScreenContainer,
} from "@/styles/pages/member/message.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const messageRef = useRef<HTMLDivElement>(null);

  // Message Content State
  const [senderNicknames, setSenderNicknames] = useState("빵빠레"); // name of message sender
  const [messages, setMessages] = useState("생일을 진심으로 축하해요!!"); // message content
  const [sendDates, setSendDates] = useState(new Date()); // message date

  /* Message Content */
  // Set cake owner nickname, total message count, and message list
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

  // Preload messages
  useEffect(() => {
    if (messageIdList.length > 0) {
      const messageIds = messageIdList.slice(0, preloadCount);
      messageIds.forEach((messageId) => {
        queryClient.prefetchQuery(readMessageQueryOption(messageId));
      });
    }
  }, [messageIdList, queryClient]);

  // Update message content
  const updateMessage = useCallback(
    async (messageId: string) => {
      const message = await queryClient
        .fetchQuery(readMessageQueryOption(messageId))
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
        setSenderNicknames(message.nickname);
        setMessages(message.content);
        setSendDates(new Date());
      }
    },
    [queryClient, router, pathname],
  );

  useEffect(() => {
    console.log(messageIdList);
    if (messageIdList.length > 0) {
      updateMessage(messageIdList[0]);
    }
  }, [messageIdList, updateMessage]);

  /* Swipe Motion */
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  // Swipe start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (messageRef.current) {
      // create inner shadow effect
      messageRef.current.style.boxShadow =
        "inset 0 0 10px rgba(100, 100, 100, 0.3)";
      setStartX(e.touches[0].clientX);
      setEndX(e.touches[0].clientX);
    }
  };

  // Swipe
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndX(e.touches[0].clientX);
  };

  // Swipe left
  const swipeLeft = () => {
    if (currentMessage < totalMessageCount) {
      setCurrentMessage(currentMessage + 1);
      updateMessage(messageIdList[currentMessage]);
    }
  };

  // Swipe right
  const swipeRight = () => {
    if (currentMessage > 1) {
      setCurrentMessage(currentMessage - 1);
      updateMessage(messageIdList[currentMessage - 2]);
    }
  };

  // Swipe end
  const handleTouchEnd = () => {
    if (messageRef.current) {
      messageRef.current.style.boxShadow = "none";
    }
    const windowWidth = window.innerWidth;
    const swipeDistance = Math.abs(startX - endX) / windowWidth;
    if (swipeDistance > 0.3) {
      if (startX - endX > 0) {
        swipeLeft();
      } else if (endX - startX > 0) {
        swipeRight();
      }
    }
    setStartX(0);
    setEndX(0);
  };

  // Change message content background color based on swipe direction and distance
  // Gradient color change based on swipe distance and direction
  const changeBackground = useCallback(() => {
    if (messageRef.current) {
      // Color will change to gradient by swipe direction and distance
      const windowWidth = window.innerWidth;
      const gradient = Math.abs(startX - endX) / (windowWidth * 3);
      if (startX - endX > 0) {
        messageRef.current.style.background = `linear-gradient(to left, rgba(150, 150, 150, ${gradient}) 0%, white 100%)`;
      } else if (endX - startX > 0) {
        messageRef.current.style.background = `linear-gradient(to right, rgba(150, 150, 150, ${gradient}) 0%, white 100%)`;
      } else {
        messageRef.current.style.background = "white";
        messageRef.current.style.opacity = "1";
      }
    }
  }, [endX, startX]);

  useEffect(() => {
    changeBackground();
  }, [changeBackground]);

  return (
    <div
      className={messagePageContainer}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={pageTop}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
      </div>
      <div className={messagePageContentContainer}>
        <div className={messageDisplayContainer}>
          <IoIosArrowBack className={navigationIcon} onClick={swipeRight} />
          <div className={fullWhiteScreenContainer}>
            <div
              className={messageContainer}
              ref={messageRef}
              onTouchStart={handleTouchStart}
            >
              <div className={messageContentContainer}>
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
          </div>
          <IoIosArrowForward className={navigationIcon} onClick={swipeLeft} />
        </div>
        <div className={cakePageCountContainer}>
          {`${currentMessage} / ${totalMessageCount}`}
        </div>
      </div>
    </div>
  );
}
