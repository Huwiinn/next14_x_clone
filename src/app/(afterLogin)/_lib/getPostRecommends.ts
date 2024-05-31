import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

// 해당 함수는 서버컴포넌트에서 react-query로 데이터를 가져오는 모습
export const getPostRecommend = async () => {
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
