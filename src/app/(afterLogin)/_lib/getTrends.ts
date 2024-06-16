const getTrends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`,
    {
      next: {
        tags: ["trends"],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("트렌드를 불러오는 데 실패하였습니다.");
  }

  return res.json();
};

export default getTrends;
