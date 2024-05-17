import Main from "./_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // 서버컴포넌트에서는 auth 사용가능
  const session = await auth();
  if (session?.user) {
    redirect("/home");
    return null;
  }

  return <Main />;
}

// 해당 서버 컴포넌트에서 로그인 모달이 같이 떠야함
