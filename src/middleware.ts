import { auth } from "./auth";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return Response.redirect("http://localhost:3000/i/flow/login");
  }
}

export const config = {
  // 로그인해야 접근 가능한 페이지
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
