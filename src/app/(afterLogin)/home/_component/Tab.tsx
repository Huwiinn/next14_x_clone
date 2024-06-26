"use client";

import React, { useContext } from "react";
import { TabContext } from "./TabProvider";
import styles from "./tab.module.css";

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);

  const onClickRec = () => {
    setTab("rec");
  };
  const onClickFol = () => {
    setTab("fol");
  };

  // useRef를 활용하여 input을 숨기고 이미지 업로드창을 띄우는 방법 연습
  // const imageRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeText}>홈</div>
      <div className={styles.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div className={styles.tabIndicator} hidden={tab === "fol"}></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={styles.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
      {/* <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
      <button title="이미지 버튼" onClick={onClickImage}>
        이미지 추가
      </button> */}
    </div>
  );
};

export default Tab;
