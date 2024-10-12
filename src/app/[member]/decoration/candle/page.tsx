"use client";

import Button from "@/components/button";
import Candle from "@/components/Candle";
import PrevPage from "@/components/PrevPage";
import { CandleType } from "@/interfaces/candles";
import deco from "../decoration.module.css";
import page from "./page.module.css";
import { useState } from "react";

export default function Page({ params }: { params: { member: string } }) {
  // Constants
  const candleList: Array<CandleType> = [
    "CANDLE_COLOR_1",
    "CANDLE_COLOR_2",
    "CANDLE_COLOR_3",
    "CANDLE_COLOR_4",
    "CANDLE_COLOR_5",
    "CANDLE_COLOR_6",
  ];

  // State
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={deco.decoPageContainer}>
      <div className={deco.decoPageWrapper}>
        <div className={deco.prevPageContainer}>
          <PrevPage url={`/${params.member}`} />
        </div>
        <div className={deco.decoMessage}>케이크 장식을 선택해주세요.</div>
        <div className={page.candleSelector}>
          {candleList.map((candle, i) => (
            <div
              className={`${page.candleElementContainer} ${
                selected === candle ? page.activeCandleElementContainer : ``
              }`}
              key={i}
              onClick={() => setSelected(candle)}
              onTouchEnd={() => setSelected(candle)}
            >
              <div className={page.candleElement}>
                <Candle candleType={candle} />
              </div>
            </div>
          ))}
        </div>
        <div className={deco.decoBtnContainer}>
          <Button
            href={`/${params.member}/decoration/message?candle_type=${selected}`}
            content="다음으로"
            color="primary"
            size="half"
            disabled={selected === null}
          />
        </div>
      </div>
    </div>
  );
}
