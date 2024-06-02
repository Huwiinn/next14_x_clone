type Props = {
  pageParam?: number;
};

// 해당 함수는 서버컴포넌트에서 react-query로 데이터를 가져오는 모습
export const getPostRecommends = async ({ pageParam }: Props) => {
  console.log("pageParam : ", pageParam);
  const res = await fetch(
    `http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return res.json();
};
