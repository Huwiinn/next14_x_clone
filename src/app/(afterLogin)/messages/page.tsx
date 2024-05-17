import React from "react";
import style from "./message.module.css";
import Room from "./_component/Room";

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
