"use client";

import styles from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function TrendSection() {
  const pathname = usePathname();
  // console.log("pathname : ", pathname);

  if (pathname === "/explore") {
    return null;
  }

  // const segment = useSelectedLayoutSegment();
  // console.log("segment : ", segment);

  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
