import styles from "./error.module.css";
import Button from "./button";

export default function Error({
  message,
  navigation,
}: {
  message?: string;
  navigation?: "main";
}) {
  return (
    <div className={styles.errorCompponent}>
      <p className={styles.errorComponentText}>{message}</p>
      {navigation === "main" && (
        <Button size="half" color="primary" content="메인으로" href={"/"} />
      )}
    </div>
  );
}
