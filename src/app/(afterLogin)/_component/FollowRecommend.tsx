"use client";

import style from "./followRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "../../../model/User";

type Props = {
  recommendFollow: User;
};

export default function FollowRecommend({ recommendFollow }: Props) {
  const session = useSession();
  const router = useRouter();

  const onFollow = () => {
    if (session.data === null) {
      router.replace("/");
    } else {
      alert("팔로우 완료!");
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
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
