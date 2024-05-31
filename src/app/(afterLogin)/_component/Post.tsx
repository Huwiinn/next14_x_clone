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
import { Post } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = { noImage?: boolean; post: Post };

export default function Post({ noImage, post }: Props) {
  const target = post;

  console.log("target : ", target);

  // 확률 반반일 때,
  if (Math.random() > 0.5 && !noImage) {
    target.images.push(
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
          <Link href={`/${target.user.id}`} className={style.postUserImage}>
            <img src={target.user.image} alt={target.user.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.user.id}`}>
              <span className={style.postUserName}>{target.user.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.user.id}</span>
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
