# Pokemon Search App (with Redux Toolkit & TailwindCSS)

포켓몬 정보를 검색하고 찜할 수 있는 React 기반 프로젝트입니다.

---

## 📦 기술 스택

- Vite
- React
- React Router DOM
- TailwindCSS v4
- Redux Toolkit
- react-icons (`FaSearch` 아이콘 활용)

---

## 1. 프로젝트 시작하기

### 1-1. Vite 기반 React 프로젝트 생성

```bash
npm create vite@latest pokemon
cd pokemon
npm install
```

### 1-2. 필요한 패키지 설치

```bash
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-icons
npm install styled-components
```

### 1-3. TailwindCSS 설정

- `vite.config.js` 파일 예시:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- `index.css` 에서 TailwindCSS 임포트:

```css
@import "tailwindcss";
```

### 1-4. 개발 서버 실행

```bash
npm run dev
```

---

## 2. 주요 UI 구성

- 포켓몬 카드 형태로 정보 출력
- 배경과 텍스트에 그라데이션 효과 적용
- 검색창 옆에 돋보기 아이콘(`<FaSearch />`) 사용
- 카드 클릭 시 상세 페이지로 이동

---

## 3. Redux Toolkit 구조

```
src/
├── features/
│   ├── pokemon/
│   │   ├── pokemonSlice.js      # 포켓몬 리스트 상태 관리
│   │   ├── pokemonAPI.js        # API 호출 함수 분리
│   │   ├── favoriteSlice.js     # 찜 상태 관리
└── app/
    └── store.js                # Redux 스토어 설정
```

---

## 4. 구현 기능 (2025.07.21)

- react-router-dom을 활용한 페이지 라우팅
- 포켓몬 이름 검색 기능 구현 (영문 기준)
- 검색창 입력 시 자동 필터링
- 검색창 꾸밈 (rounded-full, focus:ring, FaSearch 아이콘)
- 카드 클릭 시 `/detail/:id` 페이지 이동

---

## 5. 구현 기능 (2025.07.22)

✅ 포켓몬 찜하기 기능 (Redux 기반)

- favoriteSlice를 별도 파일로 분리하여 찜 상태 관리
- addToFavorite, removeFromFavorite 액션으로 찜 토글 가능
- 찜한 포켓몬 ID는 `state.favorite.favoriteIds`에 저장
- 찜 상태는 Favorites 페이지에서 확인 가능

✅ 하트 아이콘 클릭 시 상세 페이지 이동 막기 (event.stopPropagation 처리)

- 카드 전체 클릭 시 상세 페이지 이동
- 하트(찜) 아이콘 클릭 시 상세 이동 막고 찜 토글만 수행
- 이벤트 전파 제어로 정확한 클릭 이벤트 처리

✅ Search 페이지 실시간 검색 기능에 디바운싱 적용

- 검색어 입력 시 300ms 디바운싱 처리
- useEffect와 setTimeout 조합으로 성능 최적화

---

## 6. 성능 최적화 (2025.07.22)

### 6-1. useMemo를 통한 불필요한 계산 방지

```jsx
const filtered = useMemo(() => {
  return list.filter((p) =>
    p.koreanName.includes(debouncedQuery)
  );
}, [debouncedQuery, list]);
```

- 검색할 때마다 필터링이 계속 실행되지 않도록 메모이제이션 적용
- `debouncedQuery` 또는 `list` 변경 시에만 필터링 재실행
- 대규모 데이터에 유리 (불필요한 렌더링 방지)

---

### 6-2. 코드 스플리팅 - React.lazy + Suspense

- 페이지 단위 컴포넌트를 지연 로딩(lazy loading) 처리하여 초기 렌더링 속도 개선
- 특정 경로 접근 시 동적으로 컴포넌트 불러오고, 로딩 중 fallback UI 표시

```jsx
const Main = lazy(() => import('./pages/Main'));
const Detail = lazy(() => import('./pages/Detail'));
const Search = lazy(() => import('./pages/Search'));
const Favorites = lazy(() => import('./pages/Favorites'));
```

```jsx
<Suspense fallback={<div className="text-center p-6">로딩 중...</div>}>
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/detail/:id" element={<Detail />} />
    <Route path="/search" element={<Search />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
</Suspense>
```

- 장점

  - 초기 번들 사이즈 감소
  - 특정 페이지 진입 시에만 필요한 JS 로드
  - 사용자 경험(UX) 향상

---

## 7. 결과물

[pokemon.webm](https://github.com/user-attachments/assets/8a143853-ade0-45b0-832c-c120e8590847)

---

감사합니다!
