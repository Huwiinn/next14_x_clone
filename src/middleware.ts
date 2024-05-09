export { auth as middleware } from "@/auth";

export const config = {
  // 로그인해야 접근 가능한 페이지
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
