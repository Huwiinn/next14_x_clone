"use client";

import Link from "next/link";
import style from "./followRecommend.module.css";
import cx from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "../../../model/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MouseEventHandler } from "react";

type Props = {
  recommendFollow: User;
};

export default function FollowRecommend({ recommendFollow }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const followed = !!recommendFollow?.Followers.find(
    (v) => v.id === session?.user?.email
  );
  const router = useRouter();

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
      if (session === null) {
        router.replace("/");
      }

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
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
      // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
      const singlePageUserValue: User | undefined = queryClient.getQueryData([
        "users",
        recommendFollow.id,
      ]);
      console.log("singlePageUserValue : ", singlePageUserValue);
      if (singlePageUserValue) {
        const shallow = {
          ...singlePageUserValue,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...singlePageUserValue._count,
            Followers: singlePageUserValue._count?.Followers + 1,
          },
        };
        console.log("shallow : ", shallow);
        queryClient.setQueryData(["users", recommendFollow.id], shallow);
      }
    },
    onError() {
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
            (v) => v.id !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
        const singlePageUserValue: User | undefined = queryClient.getQueryData([
          "users",
          recommendFollow.id,
        ]);
        if (singlePageUserValue) {
          const shallow = {
            ...singlePageUserValue,
            // 내 이메일을 제외한 새로운 배열로 업데이트.
            Followers: singlePageUserValue.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...singlePageUserValue._count,
              Followers: singlePageUserValue._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", recommendFollow.id], shallow);
        }
      }
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
            (v) => v.id !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
        const singlePageUserValue: User | undefined = queryClient.getQueryData([
          "users",
          recommendFollow.id,
        ]);
        if (singlePageUserValue) {
          const shallow = {
            ...singlePageUserValue,
            // 내 이메일을 제외한 새로운 배열로 업데이트.
            Followers: singlePageUserValue.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...singlePageUserValue._count,
              Followers: singlePageUserValue._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", recommendFollow.id], shallow);
        }
      }
    },
    onError() {
      if (session === null) {
        router.replace("/");
      }

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
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
      // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
      const singlePageUserValue: User | undefined = queryClient.getQueryData([
        "users",
        recommendFollow.id,
      ]);
      console.log("singlePageUserValue : ", singlePageUserValue);
      if (singlePageUserValue) {
        const shallow = {
          ...singlePageUserValue,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...singlePageUserValue._count,
            Followers: singlePageUserValue._count?.Followers + 1,
          },
        };
        console.log("shallow : ", shallow);
        queryClient.setQueryData(["users", recommendFollow.id], shallow);
      }
    },
    onSettled() {},
  });

  const onFollowHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (followed) {
      onUnFollow.mutate();
    } else {
      onFollow.mutate();
    }
  };

  return (
    <Link href={`/${recommendFollow.id}`} className={style.container}>
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
    </Link>
  );
}
