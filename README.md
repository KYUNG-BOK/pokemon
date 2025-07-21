# Pokemon Search App (with Redux Toolkit & TailwindCSS)
포켓몬 정보를 검색하고 찜할 수 있는 React 기반의 프로젝트입니다.

## 📦 기술 스택

- Vite
- React
- React Router DOM
- TailwindCSS v4
- Redux Toolkit
- @reduxjs/toolkit
- react-icons (`FaSearch`활용하여 검색창 옆 돋보기 아이콘 출력)


## 1. 기본세팅
### 1-1.Vite 기반 React 프로젝트 생성
```bash
npm create vite@latest pokemon
cd pokemon
npm install
```

### 1-2 설치한 패키지
```bash
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-icons
```

### 1-3 tailwindCSS 설정
```jsx
vite.config.js파일
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

})
```

### 1-4 import tailwindcss(index.css)
```css
@import "tailwindcss";
```

### 1-5 build
```bash
npm run dev
```

---

## 2. UI 구현요소

- 포켓몬 카드 형태로 정보 출력
- 배경 및 텍스트 그라데이션 적용
- 검색창 아이콘: <FaSearch /> 사용
- 카드 클릭 시 상세 페이지로 이동

---

## 3. Redux Toolkit 구조
```bash
src/
├── features/
│   ├── pokemon/
│   │   └── pokemonSlice.js     # 포켓몬 리스트 관리
│   └── favorites/
│       └── favoritesSlice.js   # 찜한 포켓몬 관리
└── app/
    └── store.js                # Redux 스토어 설정
```
- /features/pokemon/pokemonSlice.js: 포켓몬 리스트 상태 관리
- /features/favorites/favoritesSlice.js: 찜한 포켓몬 상태 관리

---

## 4. 구현한 기능(2025.07.21)
- react-router-dom을 활용한 페이지 라우팅
- 포켓몬 이름 검색 기능 구현 (영문 기준)
- 검색창에 입력 시 자동 필터링
- 검색창 꾸밈 (rounded-full, focus:ring, FaSearch 아이콘)
- 카드 클릭 시 /detail/:id 페이지 이동

---

- 오늘은 여기까지... 내일은 어떤게 나올까... 두렵네요...
- 내일! 완성해서 마저 작성할게여~~~