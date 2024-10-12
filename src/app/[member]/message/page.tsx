"use client";

import {
  deleteMessageMutationOption,
  getCakeQueryOption,
  readMessageByRangeQueryOption,
} from "@/api/queryOptions";
import CakeName from "@/components/cakeName";
import Error from "@/components/error";
import Message from "@/components/message";
import { IGetMessageResponseByRangeMessageData } from "@/interfaces/response";
import { useErrorStore } from "@/store/error.store";
import member from "../page.module.css";
import page from './page.module.css';
import { isNotPassedOneWeek } from "@/utils/birthday";
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
            if (loadedMessageData && loadedMessageData.length > 0) {
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

  if (
    cakeInfo.data?.body.data &&
    !isNotPassedOneWeek(
      new Date(`${cakeInfo.data.body.data.birthDay}T00:00:00+09:00`),
    )
  ) {
    return (
      <Error
        message="생일 축하 메세지는 생일 당일부터 1주일간 볼 수 있습니다."
        navigation="main"
      />
    );
  }

  return (
    <div className={page.messagePageContainer} ref={pageRef}>
      <Link className={member.pageTop} href={`/${params.member}`}>
        <CakeName userName={ownerNickname} messageCount={totalMessageCount} />
      </Link>
      <div className={page.messagePageMain}>
        <div className={page.messageDisplayContainer}>
          {currentMessage === 1 ? null : (
            <IoIosArrowBack
              className={page.navigationIcon}
              onClick={swipeRight}
              style={{ left: "0" }}
            />
          )}
          <div
            className={page.messageDisplay}
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
              className={page.navigationIcon}
              onClick={swipeLeft}
              style={{ right: "0" }}
            />
          )}
        </div>
        {deleteModal && (
          <div className={page.messageDeleteModalContainer}>
            <div className={page.messageDeleteModal}>
              <div className={page.messageDeleteModalText}>삭제하시겠습니까?</div>
              <div className={page.messageDeleteModalButton} onClick={deleteMessage}>
                확인
              </div>
            </div>
          </div>
        )}
        {!deleteModal && totalMessageCount > 0 && (
          <div className={member.cakePageCountContainer}>
            {`${currentMessage} / ${totalMessageCount}`}
          </div>
        )}
      </div>
    </div>
  );
}
