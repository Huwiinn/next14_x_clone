"use client";

import styles from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  const pathname = usePathname();
  // console.log("pathname : ", pathname);

  if (pathname === "/explore") {
    return null;
  }

  // const segment = useSelectedLayoutSegment();
  // console.log("segment : ", segment);

  const { data } = useSession();

  if (!data) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>트렌드를 가져올 수 없습니다.</h3>
        </div>
      </div>
    );
  }

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
