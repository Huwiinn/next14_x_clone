import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "목맥혀요",
        id: "NeckMac",
        image: "/public/5Udwvqim.jpg",
      },
      {
        headers: {
          "set-cookie": "connect.sid=msw-cookie;HttpOnly;Path='/'",
        },
      }
    );
  }),
  http.post("/api/logout", () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "set-cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/users", () => {
    console.log("회원가입");

    // 중복 회원가입일 때, 받아야 할 리턴값
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });

    // 회원가입 성공 시, 반환 값
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "set-cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
];
