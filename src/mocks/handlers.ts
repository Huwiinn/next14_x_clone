import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";

const generateDate = () => {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);

  return faker.date.between({ from: lastWeek, to: Date.now() });
};

const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
  { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
  { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
  { id: "hwuiinn", nickname: "휘인", image: faker.image.avatar() },
];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[3], {
      headers: {
        "set-cookie": "connect.sid=msw-cookie;HttpOnly;Path='/'",
      },
    });
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

    console.log("what's cursor?? : ", cursor);

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
  http.get("/api/users/:userId/posts", ({ request, params }) => {
    const { userId } = params;
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;

    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: User[0],
        content: `${cursor + 1} ${userId}.`,
        images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[0],
        content: `${cursor + 2} ${userId}.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[1],
        content: `${cursor + 3} ${userId}.`,
        images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[0],
        content: `${cursor + 4} ${userId}.`,
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
        content: `${cursor + 5} ${userId}.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/posts/:postId/comments", ({ request, params }) => {
    const { postId } = params;
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;

    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: User[0],
        content: `${cursor + 1} 게시글의 ${postId} 답글.`,
        images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[0],
        content: `${cursor + 2} ${postId} 답글.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[1],
        content: `${cursor + 3}  ${postId} 답글.`,
        images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[0],
        content: `${cursor + 4} ${postId} 답글.`,
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
        content: `${cursor + 5} ${postId} 답글.`,
        images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("api/followRecommends", ({ request }) => {
    return HttpResponse.json(User);
  }),
  http.get("api/trends", (request) => {
    return HttpResponse.json([
      { tagId: 1, title: "제로초", count: 1264 },
      { tagId: 2, title: "원초", count: 1264 },
      { tagId: 3, title: "투초", count: 1264 },
      { tagId: 4, title: "쓰리초", count: 1264 },
      { tagId: 5, title: "포초", count: 1264 },
      { tagId: 6, title: "파이브초", count: 1264 },
      { tagId: 7, title: "식스초", count: 1264 },
      { tagId: 8, title: "세븐초", count: 1264 },
      { tagId: 9, title: "나인초", count: 1264 },
    ]);
  }),
  http.get("api/posts/:postId", ({ request, params }): StrictResponse<any> => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json(
        {
          message: "게시물을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      postId: 6,
      user: User[0],
      content: `게시글 ${postId}의 내용. 단일 게시글 api 성공`,
      images: [
        { imageId: 1, link: faker.image.urlLoremFlickr() },
        { imageId: 2, link: faker.image.urlLoremFlickr() },
        { imageId: 3, link: faker.image.urlLoremFlickr() },
      ],
      createdAt: generateDate(),
    });
  }),
  http.get("api/users/:userId", ({ request, params }): StrictResponse<any> => {
    const { userId } = params;
    const found = User.find((v) => v.id === userId);

    if (found) {
      return HttpResponse.json(found);
    } else {
      return HttpResponse.json(
        {
          message: "유저를 찾지 못했습니다.",
        },
        {
          status: 404,
        }
      );
    }
  }),
];
