import React from "react";
import styles from "@/app/(afterLogin)/home/home.module.css";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";
import TabProvider from "./_component/TabProvider";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { revalidateTag, revalidatePath } from "next/cache";

// 해당 함수는 서버컴포넌트에서 react-query로 데이터를 가져오는 모습
const getPostRecommend = async () => {
  const res = await fetch("http://localhost:9090/api/postRecommends", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  // 캐싱 초기화 함수임. 서버에 있는 캐싱이 날아감
  revalidateTag("recommends");

  // 해당 페이지 경로로 들어왔을 때, 데이터 새로고침
  revalidatePath("/home");

  return res.json();
};

const Home = async () => {
  const queryClient = new QueryClient();
  // 무조건 객체 형식으로 주입해야함.
  // 해석 : queryKey가 ["posts", "recommend"] 둘 다 있는 배열이면(해당한다면) queryFn(getPostRecommend)를 실행해라.
  // queryKey는 무조건 배열 형식으로 넣어줘야 함.
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommend,
  });
  const dehydratedState = dehydrate(queryClient);

  // 데이터 가져오기
  queryClient.getQueryData(["posts", "recommends"]);
  // setQueryData 메서드로 데이터 수정 가능

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default Home;
