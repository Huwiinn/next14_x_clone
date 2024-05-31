import Link from "next/link";
import React from "react";
import styles from "./trend.module.css";
import { HashTag } from "../../../model/HashTag";

type Props = {
  trend: HashTag;
};

const Trend = ({ trend }: Props) => {
  return (
    <Link href={`./search?q=${trend.title}`} className={styles.container}>
      <div className={styles.title}>실시간 트렌드</div>
      <div className={styles.title}>{trend.title}</div>
      <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
};

export default Trend;
