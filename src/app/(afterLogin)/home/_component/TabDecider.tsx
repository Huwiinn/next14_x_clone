"use client";

import React, { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecommends from "./PostRecommends";
import FollowingPosts from "./FollowingPosts";

const TabDecider = () => {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
};

export default TabDecider;
