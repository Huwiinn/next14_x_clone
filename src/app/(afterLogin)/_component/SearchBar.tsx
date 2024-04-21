"use client";
import React, { useRef, useState } from "react";
import styles from "./searchBar.module.css";
import { usePathname } from "next/navigation";

const SearchBar = () => {
  const radioRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const onChangeAll = () => {};
  const onChangeFollow = () => {
    radioRef.current?.click();
    console.log("radioRef.current?.click() : ", radioRef.current?.click());
  };

  if (pathname === "/explore") {
    return null;
  }

  // label을 클릭하면, input:checked의 디자인이 변경되어야 함.
  // 기존 라디오 버튼을 남겨놓되, 체크가 되면 변경된 체크 디자인이 들어와야 함.
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={styles.filterTitle}>검색 필터</h5>
        <div className={styles.filterSection}>
          <div>
            <label htmlFor="all_user">사용자</label>
            <div className={styles.radio}>
              <label htmlFor="all_user">모든 사용자</label>
              <input
                id="all_user"
                type="radio"
                name="pf"
                defaultChecked
                ref={radioRef}
                onChange={onChangeAll}
              />
              <span className={styles.custom_radio_btn}></span>
            </div>
            <div className={styles.radio}>
              <label htmlFor="follower">내가 팔로우하는 사람들</label>
              <input
                id="follower"
                type="radio"
                name="pf"
                value="on"
                ref={radioRef}
              />
              <span className={styles.custom_radio_btn}></span>
            </div>
          </div>
          <div>
            <label htmlFor="everywhere">위치</label>
            <div className={styles.radio}>
              <label htmlFor="everywhere">어디에서나</label>
              <input
                id="everywhere"
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={styles.radio}>
              <label htmlFor="around">현재 위치 주변</label>
              <input
                id="around"
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <form className={styles.search}>
        <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
        <input type="search" placeholder="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
