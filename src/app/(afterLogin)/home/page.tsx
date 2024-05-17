import React from "react";
import styles from "@/app/(afterLogin)/home/home.module.css";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";
import TabProvider from "./_component/TabProvider";

const Home = () => {
  return (
    <main className={styles.main}>
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
    </main>
  );
};

export default Home;
