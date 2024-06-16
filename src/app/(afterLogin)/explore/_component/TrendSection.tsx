"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HashTag } from "../../../../model/HashTag";
import getTrends from "../../_lib/getTrends";
import Trend from "@/app/(afterLogin)/_component/Trend";

const TrendSection = () => {
  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <>
      {data?.map((trend) => {
        return <Trend trend={trend} key={trend.tagId} />;
      })}
    </>
  );
};

export default TrendSection;
