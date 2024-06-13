"use client";

import React from "react";
import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "../../_component/BackButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUser from "@/app/(afterLogin)/[username]/_lib/getUser";
import { User } from "@/model/User";
import cx from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

const UserInfo = ({ username }: Props) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User, Object, User, [string, string]>({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const { data: session } = useSession();
  const followed = user?.Followers?.find(
    (v) => v.userId === session?.user?.email
  );
  const router = useRouter();

  const queryClient = useQueryClient();

  const onFollow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user?.id}/follow`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    },
    onMutate() {
      if (session?.user?.email === null) {
        router.replace("/login");
      }

      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === user?.id);
        if (index > -1) {
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
      }
      // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
      const singlePageUserValue: User | undefined = queryClient.getQueryData([
        "users",
        user?.id,
      ]);

      if (singlePageUserValue) {
        const shallow = {
          ...singlePageUserValue,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...singlePageUserValue._count,
            Followers: singlePageUserValue._count?.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", user?.id], shallow);
      }
    },
    onError(err) {
      console.error("Error : ", err);
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const index = value.findIndex((v) => v.id === user?.id);
        if (index > -1) {
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
        // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
        const singlePageUserValue: User | undefined = queryClient.getQueryData([
          "users",
          user?.id,
        ]);
        if (singlePageUserValue) {
          const shallow = {
            ...singlePageUserValue,
            // 내 이메일을 제외한 새로운 배열로 업데이트.
            Followers: singlePageUserValue.Followers.filter(
              (v) => v.userId !== session?.user?.email
            ),
            _count: {
              ...singlePageUserValue._count,
              Followers: singlePageUserValue._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", user?.id], shallow);
        }
      }
    },
    onSettled() {},
  });

  const onUnFollow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user?.id}/follow`,
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
        const index = value.findIndex((v) => v.id === user?.id);
        if (index > -1) {
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
        // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
        const singlePageUserValue: User | undefined = queryClient.getQueryData([
          "users",
          user?.id,
        ]);
        if (singlePageUserValue) {
          const shallow = {
            ...singlePageUserValue,
            // 내 이메일을 제외한 새로운 배열로 업데이트.
            Followers: singlePageUserValue.Followers.filter(
              (v) => v.userId !== session?.user?.email
            ),
            _count: {
              ...singlePageUserValue._count,
              Followers: singlePageUserValue._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", user?.id], shallow);
        }
      }
    },
    onError(err) {
      console.error("Error : ", err);
      if (session?.user?.email === null) {
        router.replace("/login");
      }

      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === user?.id);
        if (index > -1) {
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
      }
      // ---- 유저 개인페이지와 팔로우 상태를 동일하게 맞춰주는 구간
      const singlePageUserValue: User | undefined = queryClient.getQueryData([
        "users",
        user?.id,
      ]);

      if (singlePageUserValue) {
        const shallow = {
          ...singlePageUserValue,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...singlePageUserValue._count,
            Followers: singlePageUserValue._count?.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", user?.id], shallow);
      }
    },
    onSettled() {},
  });

  const onFollowHandler = () => {
    if (followed) {
      onUnFollow.mutate();
    } else {
      onFollow.mutate();
    }
  };

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}>
          계정이 존재하지 않습니다.
        </div>
      </>
    );
  }

  // if (isLoading) {
  //   return <p>로딩중입니다.........</p>;
  // }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user?.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={style.userImage}>
            <img src={user?.image} alt={user?.id} />
          </div>
          <div className={style.userName}>
            <div>{user?.nickname}</div>
            <div>@{user?.id}</div>
          </div>

          {user.id !== session?.user?.email && (
            <button
              className={cx(style.followButton, followed && style.followed)}
              onClick={onFollowHandler}>
              {followed ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
          <div>{user._count.Followers} 팔로워</div>
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
