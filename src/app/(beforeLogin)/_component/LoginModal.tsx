"use client";

import styles from "@/app/(beforeLogin)/_component/login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      router.replace("/home");
    } catch (err) {
      console.log("에러 : ", err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }

    // signIn("kakao"); 이런식으로 하면 카카오 로그인 호출임.
  };

  const onClickClose = () => {
    router.back();
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            onClick={onClickClose}
            title="modalClose">
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={styles.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={styles.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className={styles.message}>{message}</div>
          <div className={styles.modalFooter}>
            <button
              aria-label="로그인 버튼"
              title="로그인 버튼"
              className={styles.actionButton}
              disabled={!id && !password}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
