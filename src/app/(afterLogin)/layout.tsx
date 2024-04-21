import React, { ReactNode } from "react";
import styles from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import zlogo from "../../../public/zlogo.png";
import Image from "next/image";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogOutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";
import SearchBar from "./_component/SearchBar";

type Props = { children: ReactNode; modal: ReactNode };

const AfterLoginLayout = ({ children, modal }: Props) => {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <div>
              <Link href="/home" className={styles.logo}>
                <div className={styles.logoPill}>
                  <Image src={zlogo} alt="ZLogoImage" width={40} height={42} />
                </div>
              </Link>
              <nav>
                <ul>
                  <NavMenu />
                </ul>
                <Link
                  className={styles.postButton}
                  href="/compose/tweet"
                  aria-label="게시글 작성 버튼">
                  게시하기
                </Link>
              </nav>
            </div>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
          <section className={styles.rightSection}>
            <SearchBar />
            <TrendSection />
            <div className={styles.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
};

export default AfterLoginLayout;
