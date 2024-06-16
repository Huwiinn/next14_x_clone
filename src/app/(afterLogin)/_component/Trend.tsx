import Link from "next/link";
import React from "react";
import style from "./trend.module.css";
import { HashTag } from "../../../model/HashTag";

type Props = {
  trend: HashTag;
};

const Trend = ({ trend }: Props) => {
  return (
    <Link
      href={`./search?q=${encodeURIComponent(trend.title)}`}
      className={style.container}>
      <div className={style.title}>실시간 트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
};

export default Trend;
