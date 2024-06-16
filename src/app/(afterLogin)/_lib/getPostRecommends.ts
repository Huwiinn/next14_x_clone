// import { revalidateTag } from 'next/cache';

type Props = {
  pageParam?: number;
};

// 해당 함수는 서버컴포넌트에서 react-query로 데이터를 가져오는 모습
export const getPostRecommends = async ({ pageParam }: Props) => {
  console.log("pageParam : ", pageParam);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
        // revalidate : 3600 // (초단위)해당 시간이 지나면 새로운 데이터를 불러옴
      },
      cache: "no-store",
    }
  );

  // revalidateTag("post") on-demand 방식의 캐시데이터 초기화. post가 들어있는 tag 데이터를 모두 초기화함.

  if (!res.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
};
