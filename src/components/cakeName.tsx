import styles from "./cakeName.module.css";

/**
 * CakeName component
 * @param userName user name
 * @param messageCount number of messages
 * @returns cake name component
 */
export default function CakeName({
  userName,
  messageCount,
}: {
  userName: string;
  messageCount: number;
}) {
  return (
    <div className={styles.cakeNameContainer}>
      <div className={styles.cakeTitle}>
        <div className={styles.textPoint}>{userName}</div>
        🎂&apos;s cake
      </div>
      <div className={styles.cakeMessage}>
        지금까지
        <div className={styles.textPoint}>&nbsp;{messageCount}</div>
        개의 생일축하를 받았어요!
      </div>
    </div>
  );
}
