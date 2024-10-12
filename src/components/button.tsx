import Link from "next/link";
import styles from "./button.module.css";
import fonts from "../app/fonts.module.css";

export default function Button({
  size = "full",
  color = "primary",
  content = "",
  disabled = false,
  shadow = false,
  font = "pretendard",
  fontSize = 12,
  href,
  type,
  style,
  onClick,
  children,
}: {
  size?: "half" | "full";
  color?: "primary" | "dark" | "pink" | "white" | "white-link" | "disabled";
  content?: string;
  disabled?: boolean;
  shadow?: boolean;
  font?: "pretendard" | "uiyeun" | "lotteria";
  fontSize?: number;
  href?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  // Constants
  let buttonSize: string = "";
  switch (size) {
    case "half":
      buttonSize = styles.halfSize;
      break;
    case "full":
      buttonSize = styles.fullSize;
      break;
  }
  // Button color
  let buttonColor: string = "";
  switch (color) {
    case "primary":
      buttonColor = styles.primary;
      break;
    case "dark":
      buttonColor = styles.dark;
      break;
    case "pink":
      buttonColor = styles.pink;
      break;
    case "white":
      buttonColor = styles.white;
      break;
    case "white-link":
      buttonColor = styles.whiteLink;
      break;
    case "disabled":
      buttonColor = styles.disabled;
      break;
  }
  if (disabled) {
    buttonColor = styles.disabled;
  }
  // Font
  let fontType: string = "";
  switch (font) {
    case "pretendard":
      fontType = fonts.pretendard;
      break;
    case "uiyeun":
      fontType = fonts.uiyeun;
      break;
    case "lotteria":
      fontType = fonts.lotteria;
      break;
  }
  // Shadow
  const shadowStyle = shadow ? styles.shadow : "";

  if (href) {
    return (
      <Link
        className={`${styles.default} ${buttonSize} ${buttonColor} ${shadowStyle} ${fontType}`}
        href={href}
        style={{
          ...style,
          fontSize: `${fontSize}px`,
        }}
        onClick={onClick}
        type={type}
      >
        {content}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.default} ${buttonSize} ${buttonColor} ${shadowStyle} ${fontType}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        ...style,
        fontSize: `${fontSize}px`,
      }}
    >
      {content}
      {children}
    </button>
  );
}
