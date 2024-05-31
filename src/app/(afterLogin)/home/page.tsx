import React from "react";
import styles from "@/app/(afterLogin)/home/home.module.css";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabProvider from "./_component/TabProvider";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getPostRecommend } from "../_lib/getPostRecommends";
import TabDecider from "./_component/TabDecider";

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
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default Home;
