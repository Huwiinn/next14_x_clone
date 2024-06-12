"use client";

import styles from "./trendSection.module.css";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import getTrends from "../_lib/getTrends";
import { HashTag } from "../../../model/HashTag";
import Trend from "./Trend";

export default function TrendSection() {
  const { data: session } = useSession();
  const pathname = usePathname();
  // console.log("pathname : ", pathname);

  // const segment = useSelectedLayoutSegment();
  // console.log("segment : ", segment);

  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  if (!session) {
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
        <>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => {
            return <Trend key={trend.tagId} trend={trend} />;
          })}
        </>
      </div>
    </div>
  );
}
