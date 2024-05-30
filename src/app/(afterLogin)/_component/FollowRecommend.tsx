"use client";

import style from "./followRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FollowRecommend() {
  const session = useSession();
  const router = useRouter();
  console.log("session : ", session);

  const onFollow = () => {
    if (session.data === null) {
      router.replace("/");
    } else {
      alert("팔로우 완료!");
    }
  };

  const user = {
    id: "elonmusk",
    nickname: "Elon Musk",
    image: "/yRsRRjGO.jpg",
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
