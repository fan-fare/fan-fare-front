import {
  effectContainer,
  glitterImg,
  flagsImg,
  balloonContainer,
  effect,
  balloonBase,
  papersImg,
  balloonBaseAnimation,
} from "@/styles/components/effect.css";
import Image from "next/image";
import { CSSProperties } from "react";

/**
 * Effect component
 * @param main whether the effect is on the main page
 * @returns effect component
 */
export default function Effect({ main = false }: { main?: boolean }) {
  const ballonImgs = [
    "/assets/balloon/1.svg",
    "/assets/balloon/2.svg",
    "/assets/balloon/3.svg",
    "/assets/balloon/4.svg",
    "/assets/balloon/5.svg",
  ];

  const defaultBallonProps: CSSProperties[] = [
    {
      bottom: "9%",
      left: "0%",
      zIndex: 1,
    },
    {
      bottom: "23%",
      left: "9%",
    },
    {
      bottom: "6%",
      right: "14%",
      zIndex: 1,
    },
    {
      bottom: "4%",
      right: "6%",
      zIndex: 0,
    },
    {
      bottom: "3%",
      right: "12%",
      zIndex: 2,
    },
  ];

  const mainPageBallonProps: CSSProperties[] = [
    {
      top: "35%",
      left: "0%",
      zIndex: 1,
    },
    {
      top: "20%",
      left: "9%",
    },
    {
      bottom: "26%",
      right: "14%",
    },
    {
      bottom: "23%",
      right: "6%",
    },
    {
      bottom: "20%",
      right: "14%",
    },
  ];

  const defaultFlagsProps = {
    top: "22%",
  };

  const mainPageFlagsProps = {
    top: "0%",
  };

  return (
    <div className={effectContainer}>
      <div className={effect}>
        <Image
          src={"/assets/glitter.svg"}
          alt="glitter"
          width={0}
          height={0}
          className={glitterImg}
          loading="eager"
          priority
        />
        <Image
          src={"/assets/flags.svg"}
          alt="flags"
          width={0}
          height={0}
          className={flagsImg}
          style={main ? mainPageFlagsProps : defaultFlagsProps}
          loading="eager"
        />
        {main && (
          <Image
            src={"/assets/papers.png"}
            alt="papers"
            width={1000}
            height={0}
            className={papersImg}
            loading="eager"
          />
        )}
        <div className={balloonContainer}>
          {ballonImgs.map((src, i) => (
            <Image
              src={src}
              alt="balloon"
              width={0}
              height={0}
              className={balloonBase}
              loading="eager"
              key={i}
              style={
                main
                  ? {
                      ...mainPageBallonProps[i],
                      animation: `${balloonBaseAnimation} ${
                        Math.random() * 0.5 + 1
                      }s`,
                    }
                  : {
                      ...defaultBallonProps[i],
                      animation: `${balloonBaseAnimation} ${
                        Math.random() * 0.5 + 1
                      }s`,
                    }
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
