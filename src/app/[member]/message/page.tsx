"use client";

import {
  deleteMessageMutationOption,
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
  messageDeleteModal,
  messageDeleteModalButton,
  messageDeleteModalContainer,
  messageDeleteModalText,
  messageDisplay,
  messageDisplayContainer,
  messagePageContainer,
  messagePageMain,
  navigationIcon,
} from "@/styles/pages/member/message.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [currentMessage, setCurrentMessage] = useState(
    defaultMessageNumber ?? 1,
  ); // current message number
  const [totalMessageCount, setTotalMessageCount] = useState(0); // total message count
  const [ownerNickname, setOwnerNickname] = useState(""); // name of cake owner
  const [messagesByRange, setMessagesByRange] = useState<
    IGetMessageResponseByRangeMessageData[]
  >([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [nextMessage, setNextMessage] = useState(0);

  // Query
  const queryClient = useQueryClient();
  const cakeInfo = useQuery(getCakeQueryOption(params.member));
  const messageInfo = useQuery(readMessageByRangeQueryOption(params.member));
  const deleteMessageQuery = useMutation(deleteMessageMutationOption);

  // Store
  const setError = useErrorStore((state) => state.setError);

  // Refs
  const pageRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  /* Custom functions */
  const toggleDeleteModal = useCallback(() => {
    setDeleteModal(!deleteModal);
  }, [deleteModal]);

  /* Message Content */
  // Set total message count and owner nickname
  useEffect(() => {
    if (cakeInfo.data?.body.data) {
      setTotalMessageCount(cakeInfo.data.body.data.messages.length);
      setOwnerNickname(cakeInfo.data.body.data.nickname);
    }
  }, [cakeInfo.data?.body.data]);

  // Preload messages
  useEffect(() => {
    // The variation of the message number is 1
    // This might be changed in the future
    const messageStartNumber = defaultMessageNumber - 1;
    const messageEndNumber = defaultMessageNumber - 1;
    // Only load data when messageInfo is not success and cakeInfo is success
    // This is to prevent loading data multiple times
    if (!messageInfo.isSuccess && cakeInfo.isSuccess) {
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
              setMessagesByRange((prev) => {
                let newMessages = [...prev];
                if (prev.length === 0) {
                  // Fill the array with empty messages
                  const emptyMessages: IGetMessageResponseByRangeMessageData = {
                    messageId: BigInt(0),
                    content: "",
                    senderNickname: "",
                    candleColor: "CANDLE_COLOR_1",
                    createdAt: new Date().toISOString(),
                  };
                  newMessages = Array(preloadCount).fill(emptyMessages);
                  // Add the pre-loaded message
                  newMessages[messageStartNumber] = loadedMessageData[0];
                }
                return newMessages;
              });
            }
          }
        });
    }
  }, [
    cakeInfo.isSuccess,
    defaultMessageNumber,
    messageInfo.isSuccess,
    params.member,
    pathname,
    queryClient,
    router,
    setError,
    totalMessageCount,
  ]);

  // Load all messages
  useEffect(() => {
    if (messageInfo.isSuccess && messageInfo.data) {
      const data = messageInfo.data;
      if (data.status === 200 && data.body.data) {
        setMessagesByRange(data.body.data.messages);
      } else if (data.status === 403) {
        setError(data.status, loginErrorMessage, data.body.code);
        router.push(`/auth/signin?redirect=${pathname}`);
      } else {
        setError(data.status, readErrorMessage, data.body.code);
        router.push(`/${params.member}`);
      }
    }
  }, [
    messageInfo.data,
    messageInfo.isSuccess,
    params.member,
    pathname,
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

  // Set the current message number when the page is loaded
  useEffect(() => {
    if (nextMessage) {
      setCurrentMessage(nextMessage);
    } else if (
      defaultMessageNumber &&
      messageRef.current &&
      messagesByRange.length > 0
    ) {
      const messageNumber = defaultMessageNumber;
      setCurrentMessage(messageNumber);
      messageRef.current.scrollLeft =
        (messageNumber - 1) * messageRef.current.clientWidth;
    }
  }, [defaultMessageNumber, messagesByRange.length, nextMessage]);

  // Delete message function
  const deleteMessage = useCallback(() => {
    deleteMessageQuery.mutate(
      messagesByRange[currentMessage - 1].messageId.toString(),
    );
    setDeleteModal(false);
  }, [currentMessage, deleteMessageQuery, messagesByRange]);

  useEffect(() => {
    if (deleteMessageQuery.isSuccess && cakeInfo.data?.body.data) {
      // Invalidate the message query
      queryClient.invalidateQueries({
        queryKey: ["message"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cake", params.member],
      });
      // Set the next message number
      setNextMessage(Math.min(currentMessage, totalMessageCount));
    }
  }, [
    cakeInfo.data?.body.data,
    currentMessage,
    deleteMessageQuery.isSuccess,
    params.member,
    queryClient,
    totalMessageCount,
  ]);

  useEffect(() => {
    if (deleteMessageQuery.isError) {
      setError(400, "메세지 삭제에 실패했습니다.", "400");
    }
  }, [currentMessage, deleteMessageQuery.isError, setError]);

  return (
    <div className={messagePageContainer} ref={pageRef}>
      <Link className={pageTop} href={`/${params.member}`}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
      </Link>
      <div className={messagePageMain}>
        <div className={messageDisplayContainer}>
          {currentMessage === 1 ? null : (
            <IoIosArrowBack
              className={navigationIcon}
              onClick={swipeRight}
              style={{ left: "0" }}
            />
          )}
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
                toggleDeleteModal={toggleDeleteModal}
              />
            ))}
          </div>
          {currentMessage >= totalMessageCount ? null : (
            <IoIosArrowForward
              className={navigationIcon}
              onClick={swipeLeft}
              style={{ right: "0" }}
            />
          )}
        </div>
        {deleteModal && (
          <div className={messageDeleteModalContainer}>
            <div className={messageDeleteModal}>
              <div className={messageDeleteModalText}>삭제하시겠습니까?</div>
              <div className={messageDeleteModalButton} onClick={deleteMessage}>
                확인
              </div>
            </div>
          </div>
        )}
        {!deleteModal && totalMessageCount > 0 && (
          <div className={cakePageCountContainer}>
            {`${currentMessage} / ${totalMessageCount}`}
          </div>
        )}
      </div>
    </div>
  );
}
