import {
  message,
  messageContainer,
  messageContentContainer,
  messageInfoContainer,
  messageText,
} from "@/styles/message.css";
import { memo, useRef } from "react";

export default memo(function Message({
  senderNicknames,
  messages,
  sendDates,
  ref,
  style,
}: {
  senderNicknames: string;
  messages: string;
  sendDates: Date;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}) {
  const messageRef = useRef<HTMLDivElement>(null);
  return (
    <div className={messageContainer} ref={ref} style={style}>
      <div className={message} ref={messageRef}>
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
  );
});
