import Link from "next/link";
import React from "react";
import style from "./post.module.css";
import cx from "classnames";

type Props = {
  post: {
    postId: number;
    user: {
      id: string;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    images: { imageId: number; link: string }[];
  };
};

const PostImages = ({ post }: Props) => {
  if (!post.images) return null;
  if (!post.images.length) return null;

  if (post.images.length === 1) {
    return (
      <Link
        href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
        className={cx(style.postimagesection, style.oneImage)}
        style={{
          backgroundImage: `url(${post.images[0]?.link})`,
          backgroundSize: "contain",
        }}>
        <img src={post.images[0]?.link} alt="이미지 사진" />
      </Link>
    );
  }
  if (post.images.length === 2) {
    return (
      <div className={cx(style.postimagesection, style.twoImage)}>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          className={cx(style.postimagesection, style.twoImage)}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}>
          <img src={post.images[0]?.link} alt="이미지 사진" />
        </Link>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
          className={cx(style.postimagesection, style.twoImage)}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: "cover",
          }}>
          <img src={post.images[1]?.link} alt="이미지 사진" />
        </Link>
      </div>
    );
  }
  if (post.images.length === 3) {
    return (
      <div className={cx(style.postimagesection, style.threeImage)}>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}>
          <img src={post.images[0]?.link} alt="이미지 사진" />
        </Link>

        <div>
          <Link
            href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
            style={{
              backgroundImage: `url(${post.images[1]?.link})`,
              backgroundSize: "cover",
            }}></Link>
          <Link
            href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[2].imageId}`}
            style={{
              backgroundImage: `url(${post.images[2]?.link})`,
              backgroundSize: "cover",
            }}></Link>
        </div>
      </div>
    );
  }
  if (post.images.length === 4) {
    return (
      <div className={cx(style.postimagesection, style.fourImage)}>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}></Link>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: "cover",
          }}></Link>

        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.images[2]?.link})`,
            backgroundSize: "cover",
          }}></Link>
        <Link
          href={`/${post.user?.id}/status/${post.postId}/photo/${post.images[3].imageId}`}
          style={{
            backgroundImage: `url(${post.images[3]?.link})`,
            backgroundSize: "cover",
          }}></Link>
      </div>
    );
  }

  return null;
};

export default PostImages;
