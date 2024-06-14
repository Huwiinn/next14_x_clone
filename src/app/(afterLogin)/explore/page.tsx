import React from "react";
import styles from "./explore.module.css";
import SearchForm from "../_component/SearchForm";
import TrendSection from "./_component/TrendSection";
import { Metadata } from "next/types";

// 일반 객체임
export const metadata: Metadata = {
  title: "탐색하기 - Clone X",
  description: "탐색하기 - Clone X",
};

const page = () => {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <TrendSection />
      </div>
    </main>
  );
};

export default page;
