import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <div>해당 페이지는 존재하지 않습니다.</div>
      <Link href="/search">검색</Link>
    </div>
  );
};

export default NotFound;
