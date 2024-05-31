const getTrends = async () => {
  const res = await fetch("http://localhost:9090/api/trends", {
    next: {
      tags: ["trends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("트렌드를 불러오는 데 실패하였습니다.");
  }

  return res.json();
};

export default getTrends;
