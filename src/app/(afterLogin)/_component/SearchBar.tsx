"use client";
import React, { useRef, useState } from "react";
import styles from "./searchBar.module.css";
import { usePathname } from "next/navigation";
import SearchForm from "./SearchForm";

const SearchBar = () => {
  const radioRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const onChangeAll = () => {};
  const onChangeFollow = () => {
    radioRef.current?.click();
    // console.log("radioRef.current?.click() : ", radioRef.current?.click());
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
                ref={radioRef}
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
                ref={radioRef}
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
      <SearchForm />
    </div>
  );
};

export default SearchBar;
