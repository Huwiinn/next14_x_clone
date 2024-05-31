import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const generateDate = () => {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);

  return faker.date.between({ from: lastWeek, to: Date.now() });
};

const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: faker.image.avatar() },
  { id: "휘인", nickname: "Hwuiinn", image: faker.image.avatar() },
  { id: "철수", nickname: "CukSu", image: faker.image.avatar() },
];

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
    // 보낼 데이터가 없을 때, 보통 new HttpResponse를 많이 사용함.
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

  http.get("/api/postRecommends", ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: User[0],
        content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
        images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[0],
        content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[1],
        content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
        images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[0],
        content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: User[2],
        content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/search/:tag", ({ request, params }) => {
    const { tag } = params;
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: User[0],
        content: `${cursor + 1} 검색결과 ${tag}.`,
        images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[0],
        content: `${cursor + 2} 검색결과 ${tag}.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[1],
        content: `${cursor + 3} 검색결과 ${tag}.`,
        images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[0],
        content: `${cursor + 4} 검색결과 ${tag}.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: User[2],
        content: `${cursor + 5} 검색결과 ${tag}.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/followingPosts", ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: User[0],
        content: `${cursor + 1} 운동 갈 것.`,
        images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[0],
        content: `${cursor + 2} 끝나고 도서관으로 갈 것`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[1],
        content: `${cursor + 3} 오늘 약속 잡지 말 것.`,
        images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[0],
        content: `${cursor + 4} 내일 출근이니까 8시에 일어날 것.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: User[2],
        content: `${cursor + 5} 사전 인터뷰 내용 작성할 것.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
];
