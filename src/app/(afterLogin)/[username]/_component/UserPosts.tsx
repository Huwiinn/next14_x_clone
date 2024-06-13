"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getUserPosts from "../_lib/getUserPosts";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  username: string;
};

const UserPosts = ({ username }: Props) => {
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [string, string, string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (user) {
    return data?.map((post) => {
      <Post key={post.postId} post={post} />;
    });
  }

  return null;
};

export default UserPosts;
