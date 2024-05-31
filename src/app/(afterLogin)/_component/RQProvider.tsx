"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

const RQProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 다른 탭에 갔다가 돌아왔을 경우, 데이터를 유지 할 것인지 새로 불러 올 것인지?
          retryOnMount: true, // 컴포넌트가 언마운트 되었다가 다시 마운트 되었을 때, 데이터를 새로 가져올 것 인지?
          refetchOnReconnect: false, // 인터넷 연결이 끊어졌다가 재연결 되면 새로운 데이터를 가지고 올 것인지?
          retry: false, // 데이터를 가져오는데 실패하면, 몇 번 정도 재시도 할 것인지?
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
};

export default RQProvider;
