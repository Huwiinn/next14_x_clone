"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import style from "./chatRoom.module.css";
import Link from "next/link";
import BackButton from "../../_component/BackButton";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/LocalizedFormat";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);

const ChatRoom = () => {
  const user = {
    id: "qwer",
    nickname: "에헤헹",
    image: faker.image.avatar(),
  };

  const messages = [
    {
      messageId: 1,
      roomId: 1123,
      id: "zeroch0",
      content: "반갑습니다.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 1123,
      id: "hero",
      content: "좋은 하루입니다.",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt="유저 이미지" />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((message) => {
          if (message.id === "zeroch0") {
            // 나의 메세지일 때
            return (
              <div
                key={message.messageId}
                className={cx(style.message, style.myMessage)}>
                <div className={style.content}>{message.content}</div>
                <div className={style.date}>
                  {dayjs(message.createdAt).format("YYYY-MM-DD A HH:mm:ss")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={message.messageId}
              className={(style.message, style.yourMessage)}>
              <div className={style.content}>{message.content}</div>
              <div className={style.date}>
                {dayjs(message.createdAt).format("YYYY-MM-DD A HH:mm:ss")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ChatRoom;
