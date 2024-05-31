import React from "react";
import styles from "./explore.module.css";
import SearchForm from "../_component/SearchForm";
import TrendSection from "./_component/TrendSection";

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
