"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../model/User";
import getFollowRecommends from "../_lib/getFollowRecommends";
import FollowRecommend from "./FollowRecommend";

const FollowRecommendsSec = () => {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <>
      {data?.map((recommendFollow) => {
        return (
          <FollowRecommend
            recommendFollow={recommendFollow}
            key={recommendFollow.id}
          />
        );
      })}
    </>
  );
};

export default FollowRecommendsSec;
