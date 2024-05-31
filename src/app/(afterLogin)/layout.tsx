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
import { auth } from "@/auth";
import RQProvider from "./_component/RQProvider";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../model/User";
import getFollowRecommends from "./_lib/getFollowRecommends";
import FollowRecommendsSec from "./_component/FollowRecommendsSec";

type Props = { children: ReactNode; modal: ReactNode };

const AfterLoginLayout = async ({ children, modal }: Props) => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <div>
              <Link
                href={session?.user ? "/home" : "/"}
                className={styles.logo}>
                <div className={styles.logoPill}>
                  <Image src={zlogo} alt="ZLogoImage" width={40} height={42} />
                </div>
              </Link>
              {session?.user && (
                <>
                  <nav>
                    <ul>
                      <NavMenu />
                    </ul>
                    <Link
                      className={styles.postButton}
                      href="/compose/tweet"
                      aria-label="게시글 작성 버튼">
                      <span>게시하기</span>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        aria-hidden="true"
                        className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp">
                        <g>
                          <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                        </g>
                      </svg>
                    </Link>
                  </nav>
                </>
              )}
            </div>
            <LogoutButton />
          </div>
        </section>
      </header>
      <RQProvider>
        <div className={styles.rightSectionWrapper}>
          <div className={styles.rightSectionInner}>
            {/* main 태그에 들어가는 자식은 현재 폴더 경로애 위치한 page.tsx 파일이다. */}
            <main className={styles.main}>{children}</main>
            <section className={styles.rightSection}>
              <SearchBar />
              <TrendSection />
              <div className={styles.followRecommend}>
                <>
                  <h3>팔로우 추천</h3>
                  <FollowRecommendsSec />
                </>
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  );
};

export default AfterLoginLayout;
