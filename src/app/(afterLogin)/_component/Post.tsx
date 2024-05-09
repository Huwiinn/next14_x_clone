import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
// {faker} 이런 방식을 '네임드 임포트' 라고 한다.
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = { noImage?: boolean };
export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "1년 반만 딱 대라..",
    createdAt: new Date(),
    Images: [] as any[],
  };

  // 확률 반반일 때,
  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() }
    );
  }

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            <PostImages post={target} />
          </div>
          <ActionButtons white />
        </div>
      </div>
    </PostArticle>
  );
}
