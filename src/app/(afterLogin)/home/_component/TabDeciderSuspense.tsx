import TabDecider from "./TabDecider";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getPostRecommends } from "../../_lib/getPostRecommends";

export const TabDeciderSuspense = async () => {
  const queryClient = new QueryClient();
  // 무조건 객체 형식으로 주입해야함.
  // 해석 : queryKey가 ["posts", "recommend"] 둘 다 있는 배열이면(해당한다면) queryFn(getPostRecommend)를 실행해라.
  // queryKey는 무조건 배열 형식으로 넣어줘야 함.
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  // 캐싱된 데이터 가져오기
  queryClient.getQueryData(["posts", "recommends"]);
  // setQueryData 메서드로 데이터 수정 가능

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
};

export default TabDeciderSuspense;
