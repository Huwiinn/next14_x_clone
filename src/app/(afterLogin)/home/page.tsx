import styles from "@/app/(afterLogin)/home/home.module.css";
import React, { Suspense } from "react";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabProvider from "./_component/TabProvider";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "./loading";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Async Server Component */}
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
};

export default Home;
