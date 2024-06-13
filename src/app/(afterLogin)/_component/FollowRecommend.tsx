"use client";

import style from "./followRecommend.module.css";
import cx from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "../../../model/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  recommendFollow: User;
};

export default function FollowRecommend({ recommendFollow }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const followed = !!recommendFollow?.Followers.find(
    (v) => v.userId === session?.user?.email
  );
  const router = useRouter();

  // const onFollow = () => {
  //   if (session.data === null) {
  //     router.replace("/");
  //   } else {
  //     alert("팔로우 완료!");
  //   }
  // };

  const onFollow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${recommendFollow.id}/follow`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    },
    onMutate() {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === recommendFollow.id);
        console.log(value, recommendFollow.id, index);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
    onError(err) {
      console.log("팔로우 에러 : ", err);
      console.error("팔로우 에러 : ", err);
    },
    onSettled() {},
  });

  const onUnFollow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${recommendFollow.id}/follow`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    },
    onMutate() {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === recommendFollow.id);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter(
            (v) => v.userId !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
    onError(err) {
      console.log("팔로우 에러 : ", err);
      console.error("팔로우 에러 : ", err);
    },
    onSettled() {},
  });

  const onFollowHandler = () => {
    console.log("팔로우 클릭!!");
    if (followed) {
      onUnFollow.mutate();
    } else {
      onFollow.mutate();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={recommendFollow.image} alt={recommendFollow.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{recommendFollow.nickname}</div>
        <div className={style.count}>@{recommendFollow.id}</div>
      </div>
      <div
        className={cx(style.followButtonSection, followed && style.followed)}>
        <button onClick={onFollowHandler}>
          {followed ? "팔로잉" : "팔로우"}
        </button>
      </div>
    </div>
  );
}
