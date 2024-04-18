import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(beforeLogin)/_component/main.module.css";
import zlogo from "../../../../public/zlogo.png";

const Main = () => {
  return (
    <>
      <div className={styles.left}>
        <Image src={zlogo} alt="logo" />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
        <a className={styles.just_a_tag}>이것은 a 태그입니다.</a>
      </div>
    </>
  );
};

export default Main;
