"use client";

import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "../_component/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Profile() {
  const user = {
    id: "zerohch0",
    nickname: "제로초",
    image: "/5Udwvqim.jpg",
  };

  const session = useSession();
  const router = useRouter();

  const onFollow = () => {
    if (session.data === null) {
      router.replace("/");
    }
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton} onClick={onFollow}>
          팔로우
        </button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
