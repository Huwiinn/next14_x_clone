"use client";

import style from "./logOutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession(); // 클라이언트에서만 사용가능. 유저 정보를 불러온다.

  const onLogout = () => {
    signOut({ redirect: false });
    router.replace("/");
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me?.user.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id}</div>
      </div>
    </button>
  );
}
