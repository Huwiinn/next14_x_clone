# Next.js 14 캐싱기법 공식문서 페이지

https://nextjs.org/docs/app/building-your-application/caching#duration

### revalidatePath('/home/)

- 해당 함수를 이런식으로 사용하면 /home이라는 주소에 있는 요청들에 있는 캐시들을 전부 초기화함.

### Full Route Cache

- 페이지들을 얼마동안 캐싱 할 것인가?
- 서버 컴포넌트와 클라이언트 컴포넌트를 미리 빌드해놓음. 페이지가 넘어갈 때마다 미리 빌드한 컴포넌트를 제공하는 개념임.
- Full Route Cache가 제대로 동작하기 위해서는 정말 페이지 내에 있는 요소들이 하나도 변하지 않아야 한다. 따라서 정말 잘 바뀌지 않는 페이지에 적합함.
- 데이터 캐시가 수정되는 순간, Full Route Cache도 수정됩니다.
- Ex : 받아오는 데이터 중에 {cache : 'no-store'}가 들어있는 요소가 페이지 내에 있다면, Full Route Cache는 의미가 없어진다.
- 즉, 데이터 캐시의 영향을 많이 받는다.

### Opting out

- 데이터 캐싱을 사용하지 않는 모든 것을 포함하는 내용임. (자주 변경되는 컨텐츠)

### Dynamic Functions

- **cookies, headers, useSearchParams, searchParams === Dynamic Function**
- cookies, headers, useSearchParams, searchParams 등을 사용하는 순간 Full Route Cache는 동작하지 않는다.
- 위 4개의 함수는 매 요청마다 달라질 수 있기 때문임.

### Router Cache

- 유일하게 클라이언트에서만 동작하는 캐시 방법
- 컴포넌트 별로 기억한다.
- 이 말 즉슨, layout.tsx는 고정요소이고 만약 page.tsx가 동적이라면 페이지 경로에 따른 page.tsx만 새로 불러오고, layout.tsx는 이전의 컴포넌트를 그대로 사용한다.
- 페이지를 새로고침하기 전 까지 캐싱이 유지된다.
- static OR dynamic 렌더링의 기준은 Dynamic Function과 data cache로 좌우된다.
- Dynamic Functions(No) && Data(Cached) === Statically Rendered (블로그 글, 뉴스 기사 등)
- 이외에는 모두 Dynamically Rendered.

### 핵심

- 각각 캐싱 전략을 어떤 상황에 적용해야하는지 판단하는 것이 중요함.

<hr>

from next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output : 'export', 해당 속성이 있으면 StaticMode, 없으면 Dynamic Mode
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
    ];
  },
};

export default nextConfig;
```

- StaticMode : Next.js 서버 없이 완전히 html 페이지들 만으로 구성된 정적인 사이트.

  - 빌드를 하는 순간에 모든 컨텐츠가 결정이 된다.
  - 따라서 넥스트 서버가 필요하지 않다.
  - 넥스트 서버가 필요한 경우는 변하는 컨텐츠들 때문에 필요함.
  - 사용을 고려해볼 수 있는 경우 : 블로그, 일방적인 정보 제공 뉴스
  - Next.js 12버전에 있던 SSG(Static Site Generation)와 동일한 개념임.

- ISR이 Next.js에서 사라졌다.
  - Data Fetching, Caching, Revalidating으로 구현할 수 있음.
  - 다이나믹 렌더링 방식.
  - Full Route Cache가 ISR 역할을 충분히 해줄 수 있다.
  - ISR에서 기존 컨텐츠가 수정되는 경우를 위한 기능이 있었는데, Revalidating Data로 구현 가능하다.
    - Data Cache를 날려버림
