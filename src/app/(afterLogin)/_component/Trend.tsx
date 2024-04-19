import Link from "next/link";
import React from "react";
import styles from "./trend.module.css";

const Trend = () => {
  return (
    <Link href={`./search?q=트렌드`} className={styles.container}>
      <div className={styles.title}>실시간 트렌드</div>
      <div className={styles.title}>이해주, 텐퍼센트의 황제</div>
      <div className={styles.count}>9,999 posts</div>
    </Link>
  );
};

export default Trend;
