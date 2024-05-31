const getFollowRecommends = async () => {
  const res = await fetch("http://localhost:9090/api/followRecommends", {
    next: {
      tags: ["users", "followRecommends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("팔로우 추천을 불러오는 데 실패하였습니다.");
  }

  return res.json();
};

export default getFollowRecommends;
