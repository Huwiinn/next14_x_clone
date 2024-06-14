import { Metadata } from "next/types";
import React from "react";
import style from "./message.module.css";
import Room from "./_component/Room";

export const metadata = (): Metadata => {
  return {
    title: `쪽지 - 검색 X`,
    description: `쪽지 - 검색 X`,
  };
};

const Page = () => {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
};

export default Page;
