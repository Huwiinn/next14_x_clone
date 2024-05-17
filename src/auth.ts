import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
