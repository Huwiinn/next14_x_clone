import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";
import KakaoProvider from "next-auth/providers/kakao"; // 카카오, 네이버 프로바이더 추가

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "i/flow/login",
    newUser: "i/flow/signup",
  },

  // callbacks: {
  //   async authorized({ request, auth }) {
  //     if (!auth) {
  //       return Response.redirect("http://localhost:3000");
  //     }
  //     return true;
  //   },
  // },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );

        // 해당 코드 무슨 의미인지 알아보기
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("authResponse : ", authResponse);
        console.log("setCookie : ", setCookie);

        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          console.log("parsed : ", parsed);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것 (클라이언트_프론트 서버에는 쿠키를 심어주면 안된다.)
          // 브라우저에 심어준 쿠키는 백엔드 라우터 토큰임.
        }

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user : ", user);

        // 세션 토큰 데이터
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
    // KakaoProvider()
  ],
});
