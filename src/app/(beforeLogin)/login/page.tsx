// 서버측 리다이렉트 방법
// import { redirect } from "next/navigation";

// const Login = () => {
//   redirect("/i/flow/login");
// };

// export default Login;

// -----------------------------------

// 클라이언트측 리다이렉트 방법
"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user) {
    // 아래 router부분 에러 원인 뜯어보기
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");
  return <Main />;
};

export default Login;

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login

// 차이점은 "뒤로가기"
// push로 이동 후에, 뒤로가기를 하면 바로 직전 화면으로 뒤로 돌아간다.
// replace로 이동 후에, 뒤로가기를 하면 바로 직전 화면이 아닌 더 전 화면으로 돌아간다.
