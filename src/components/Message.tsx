"use client";

import {
  deleteIconContainer,
  message,
  messageContainer,
  messageContentContainer,
  messageInfoContainer,
  messageText,
} from "@/styles/components/message.css";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

/**
 * Message component
 * @param senderNicknames sender's nickname
 * @param messages message content
 * @param sendDates message send date
 * @param ref reference
 * @param style style
 * @returns Message component
 */
export default memo(function Message({
  senderNicknames,
  messages,
  sendDates,
  ref,
  style,
  toggleDeleteModal,
}: {
  senderNicknames?: string;
  messages?: string;
  sendDates?: Date;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  toggleDeleteModal: () => void;
}) {
  const messageRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (sendDates) {
      setDate(
        `${Math.floor(sendDates.getFullYear())
          .toString()
          .padStart(4, "0")}.${Math.floor(sendDates.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${Math.floor(sendDates.getDate())
          .toString()
          .padStart(2, "0")}`,
      );
    } else {
      const now = new Date();
      setDate(
        `${Math.floor(now.getFullYear())
          .toString()
          .padStart(4, "0")}.${Math.floor(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${Math.floor(now.getDate())
          .toString()
          .padStart(2, "0")}`,
      );
    }
  }, [sendDates]);

  return (
    <div className={messageContainer} ref={ref} style={style}>
      <div className={message} ref={messageRef}>
        <div className={messageContentContainer}>
          <div className={messageText}>{messages}</div>
          <div className={messageInfoContainer}>
            <div>{date}</div>
            <div>by. {senderNicknames}</div>
          </div>
        </div>
        <div className={deleteIconContainer}>
          <Image
            src={"/assets/delete_button.png"}
            width={24}
            height={24}
            alt="delete"
            onClick={toggleDeleteModal}
          />
        </div>
      </div>
    </div>
  );
});
