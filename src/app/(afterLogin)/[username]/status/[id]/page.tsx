import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import React from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";

const SinglePage = () => {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      <div className={style.postAndCommentFormSection}>
        <Post />
        <CommentForm />
        <div>
          {/* 답글들이 보여질 곳임 */}
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
