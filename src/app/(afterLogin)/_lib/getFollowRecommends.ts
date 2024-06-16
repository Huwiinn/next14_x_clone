const getFollowRecommends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`,
    {
      next: {
        tags: ["users", "followRecommends"],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("팔로우 추천을 불러오는 데 실패하였습니다.");
  }

  return res.json();
};

export default getFollowRecommends;
