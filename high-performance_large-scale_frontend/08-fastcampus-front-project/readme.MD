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
