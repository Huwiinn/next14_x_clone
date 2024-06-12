"use client";

import React from "react";
import style from "../photoModal.module.css";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../../../../../../[username]/status/[id]/_lib/getSinglePost";
import { Post } from "@/model/Post";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

type Props = {
  id: string;
};

const ImageZone = ({ id }: Props) => {
  const { data: post } = useQuery<Post, Object, Post, [string, string]>({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={style.imageZone}>
      <img src={post.Images[0].link} alt={post.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
};

export default ImageZone;
