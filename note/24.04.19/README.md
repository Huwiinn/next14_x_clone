현재 내가 있는 브라우저 경로를 알기 위해서는 서버컴포넌트에서는 알 수 없다.

클라이언트 컴포넌트에서 경로 확인이 가능함.

<hr>

`import { useSelectedLayoutSegment } from "next/navigation";`
지금 보여지고 있는 View Layout 폴더 최상위 이름을 잡아주는 Hook

`const segment = useSelectedLayoutSegments();`
반면 useSelectedLayoutSegments는 최상위 폴더 기준으로 하위 폴더명을 가르킴

이것들을 이용하여 현재 View 경로를 추측할 수 있음.

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

useSelectedLayoutSegment

usePathname

두 훅의 차이점이 궁금합니다.

둘 다 url에서 쿼리스트링 전까지 나오는 문자열을 추출하는 훅으로 보이는데 언제 어떤 훅을 사용해야 하나요?

ActiveLink 만드는데 usePathname 으로는 안되나요?

=>

useSelectedLayoutSegmemt는 layout 페이지에서만 사용 가능합니다. page.tsx에서는 안 됩니다. usePathname은 다른 곳에서도 사용 가능하고요.

usePathname은 pathname이 통째로 나오므로 별도의 처리가 필요하지만 자기 마음대로 처리할 수 있어 자유도가 높기도 합니다.

/product, /en/product 같은 다국어 처리가 된 페이지에서는 layoutSegment가 product만 뜨므로 이 때는 layoutSegment가 편하겠네요.

<hr>

Hook을 써야하는 것들은 무조건 클라이언트 컴포넌트로 뺀다.
onClick 함수가 서버 컴포넌트에 있으면 에러가 날 수 있으므로 주의하자.

> 무조건 on이나 use가 붙은 함수를 실행해야하는 컴포넌트에는 "use client"를 기입한다고 생각하자.

<hr>

svg 복사

=> 개발자 도구 - 요소 - 복사할 svg 우클릭 - outer html 복사

<hr>
