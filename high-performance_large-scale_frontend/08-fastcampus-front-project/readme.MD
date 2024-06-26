# 디자인 시스템


# yarn berry 세팅
  yarn create next-app 07-my-account
  node_modules 삭제

  ❯ yarn set version version
    - yarn berry 세팅
    - .yarnrc.yml 파일로 이동
    - nodeLinker: pnp > 작성
      - node_modules를 사용 하지않는다고 선언
  - yarn install

# storybook 세팅
  > cd service/storybook
  - yarn init
  - yarn add --dev vite
  > root 실행
  - yarn workspace @fastcampus/storybook dlx storybook init --type react

# 테스트
> yarn workspace @fastcampus/storybook add --dev vitest @vitejs/plugin-react @vitest/ui

# 접근성 테스트
> yarn add -D @storybook/addon-a11y

# 비주얼 회귀 테스트 (Visual Regression Tests) chromatic or storybook visual test
https://www.chromatic.com
https://storybook.js.org/docs/writing-tests/visual-testing
> yarn add --dev chromatic
> yarn add -D storybook-addon-pseudo-states

vite.config.ts
``` ts
  /// <reference types="vitest" />

  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "happy-dom",
      include: ["./stories/**/*.test.ts?(x)"],
    },
  });
```
- yarn add -D happy-dom
``` yaml
  packageExtensions:
    "local-pkg@*":
      dependencies:
        "happy-dom": "^14.12.3"
```

- 테스팅 라이브러리 추가
  > yarn add -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event


# storybook 문서화
- 예시 Toast.mdx

# nextra 문서화
> yarn add next react react-dom nextra nextra-theme-docs

## 내부 워크스페이스 패키지 다운 방법
 > yarn add --dev @fastcampus/themes
 > yarn add --dev @fastcampus/react-components-layout

## 프로젝트 구조
  ### 최상위 폴더 및 파일
  - `.eslintrc.js`: ESLint 설정 파일입니다. 코드 품질과 스타일을 유지하기 위한 규칙이 정의되어 있습니다.
  - `.gitignore`: Git에서 추적하지 않을 파일 및 폴더를 지정합니다.
  - `.prettierrc`: Prettier 설정 파일로, 코드 포맷팅 규칙이 정의되어 있습니다.
  - `README.md`: 프로젝트에 대한 설명과 구조, 사용 방법 등이 포함된 문서입니다.
  - `nx.json`: NX 모노레포 도구 설정 파일입니다.
  - `package.json`: 프로젝트 메타데이터 및 종속성을 정의합니다.
  - `tsconfig.base.json`: TypeScript 컴파일러 옵션의 기본 설정을 포함합니다.
  - `tsconfig.eslint.json`: ESLint와 함께 사용하기 위한 TypeScript 설정 파일입니다.
  - `yarn.lock`: Yarn 종속성 트리를 잠그는 파일입니다.


  ### packages 폴더
  - `esbuild-config`: ESBuild 설정과 관련된 파일이 포함되어 있습니다.
    - `README.md`: `esbuild-config` 패키지에 대한 설명서입니다.
    - `index.js`: ESBuild 설정 파일입니다.
    - `package.json`: `esbuild-config` 패키지의 메타데이터 및 종속성 정보입니다.

  - `react`: React 컴포넌트 관련 파일이 포함되어 있습니다.
    - `components`: 레이아웃 및 기타 React 컴포넌트가 포함된 폴더입니다.

  - `themes`: 테마와 관련된 파일이 포함되어 있습니다.
    - `build.js`: 테마 빌드 스크립트입니다.
    - `scripts`: 추가 빌드 스크립트가 포함되어 있습니다.
    - `src`: 테마 소스 파일들이 포함되어 있습니다.

  ### services 폴더
  - 각종 서비스 관련 파일이 포함되어 있는 폴더입니다. 서비스 모듈과 관련된 파일이 여기에 위치합니다.


# Dependencies 설명 및 설치 명령어

### @typescript-eslint/eslint-plugin (^6.5.0)
- 설명: TypeScript 코드에서 ESLint를 사용할 수 있게 해주는 플러그인입니다.
- 설치 명령어:
  > yarn add @typescript-eslint/eslint-plugin -D

### @typescript-eslint/parser (^6.5.0)
- 설명: TypeScript 코드를 파싱하여 ESLint가 이해할 수 있게 해주는 파서입니다.
- 설치 명령어:
  > yarn add @typescript-eslint/parser -D

### eslint (^8.48.0)
- 설명: JavaScript 및 TypeScript 코드의 문법 및 스타일 문제를 발견하고 고칠 수 있는 린터입니다.
- 설치 명령어:
  > yarn add eslint -D

### eslint-config-prettier (^9.0.0)
- 설명: ESLint와 Prettier를 함께 사용할 때 발생할 수 있는 충돌을 방지하는 설정입니다.
- 설치 명령어:
  > yarn add eslint-config-prettier -D

### eslint-plugin-import (^2.28.1)
- 설명: 모듈 import 구문을 검증하고 관리하기 위한 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-import -D

### eslint-plugin-json-format (^2.0.1)
- 설명: JSON 파일의 형식을 검사하고 일관성을 유지하는 데 도움을 주는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-json-format -D

### eslint-plugin-jsx-a11y (^6.7.1)
- 설명: JSX 코드에서 접근성을 검증하고 문제를 보고하는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-jsx-a11y -D

### eslint-plugin-react (^7.33.2)
- 설명: React 코드의 린팅을 지원하는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-react -D

### eslint-plugin-react-hooks (^4.6.0)
- 설명: React Hooks 사용 시 발생할 수 있는 문제를 검증하는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-react-hooks -D

### eslint-plugin-simple-import-sort (^10.0.0)
- 설명: import 구문을 자동으로 정렬해주는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-simple-import-sort -D

### eslint-plugin-storybook (^0.6.13)
- 설명: Storybook 파일의 린팅을 지원하는 ESLint 플러그인입니다.
- 설치 명령어:
  > yarn add eslint-plugin-storybook -D

### nx (^16.8.1)
- 설명: 모노레포 관리 도구로, 대규모 프로젝트를 효율적으로 관리할 수 있게 해줍니다.
- 설치 명령어:
  > yarn add nx -D

### prettier (^3.0.3)
- 설명: 코드 포매터로, 코드의 스타일을 일관되게 유지하는 데 도움을 줍니다.
- 설치 명령어:
  > yarn add prettier -D

### typescript (^5.2.2)
- 설명: TypeScript는 JavaScript의 슈퍼셋으로, 정적 타입 검사를 제공합니다.
- 설치 명령어:
  > yarn add typescript -D