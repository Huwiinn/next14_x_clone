"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

export const a = 1;

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    // onClickCapture를 사용하지 않으면 이벤트 버블링으로 인해 제일 바깥쪽 이벤트(부모 요소 이벤트)가 실행된다.
    // "onClickCapture를 사용하여 해당 요소의 이벤트만 캡처하고 상위 요소 이벤트가 아래로 전달되는 것을 방지할 수 있습니다."
    <article onClick={onClick} className={style.post}>
      {/* <article onClick={onClick} className={style.post}> */}
      {children}
    </article>
  );
}
