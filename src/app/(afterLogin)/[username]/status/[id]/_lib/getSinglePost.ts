export const getSinglePost = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
    credentials: "include",
    cache: "no-store", //  해당 속성을 없애면 처음에 불러왔던 이미지를 계속해서 사용함. 활성화되면 매번 새로운 데이터를 불러와서 적용함. revalidate할 때 까지.
  });

  if (!res.ok) {
    throw new Error(
      `id : ${id} 유저의 단일 게시물을 불러오는 데 실패했습니다.`
    );
  }

  return res.json();
};

export default getSinglePost;
