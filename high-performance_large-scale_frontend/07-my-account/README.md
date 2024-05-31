# 프로젝트 환경 구성
- Boilerplate = yarn create next-app
  - next 특정 버전 사영 (yarn add next@version)
- Rules = ESLint + Prettier
- Style = emotion
- Package Manager = Yarn Berry (with. pnp)

# Yarn Berry (with. pnp) 선택 이유
- 무거운 node_modules
- 비효울적인 의존성 검색
- 비효율적인 설치 (다른 버전의 패키지 중복 설치)
- 유령의존성

장점
- 효율적인 의존성 검색
- 엄격한 의존성 관리
- CI 시간 단축


# yarn berry 세팅
yarn create next-app 07-my-account
node_modules 삭제

❯ yarn set version version
  - yarn berry 세팅
  - .yarnrc.yml 파일로 이동
  - nodeLinker: pnp > 작성
    - node_modules를 사용 하지않는다고 선언
  - yarn install


# vscode가 yarn이 가져오는 의존성을 사용하기 위해
  - ZipFs Plugin
  - https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs
    - 해당 익스텐션 추가 (vscode)
    - typescript를 프로젝트별로 버전을 사용하기 위해
  - yarn dlx @yarnpkg/sdks vscode
    - ctrl + p
    - select typescript version 
    - 타입스크립트를 로컬 버전을 사용하게한다.


# .gitignore 세팅
<a href="https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored">https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored</a>

" If you're using Zero-Installs: "
  .yarn/*
  !.yarn/cache
  !.yarn/patches
  !.yarn/plugins
  !.yarn/releases
  !.yarn/sdks
  !.yarn/versions

# App.text.tsx 파일 오류
  - yarn remove @testing-library/jest-dom
  - yarn add -D @types/testing-library__jest-dom @testing-library/jest-dom

  - tsconfig.json compilerOptions 에 => "types": ["@testing-library/jest-dom"], 코드 추가


# ESLint 세팅
  - yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-react eslint-config-react-app 
  - Config 설정 분리
  <!-- - yarn add @yarnpkg/sdks vscode -->

  - .eslintrc 세팅
    - "package.json 에서 eslintConfig 내부에 내용을 지우고" 중요
    - .eslintrc 파일을 추가하고
    - 하단의 내용을 추가해준다.

    ``` json
      {
        "extends": ["next/babel", "next/core-web-vitals", "plugin:prettier/recommended"],
        "plugins": ["prettier", "simple-import-sort"],
        "rules": {
          "prettier/prettier": "error",
          "import/order": [
            "error",
            {
              "groups": ["builtin", "external", "internal", ["parent", "type"], "sibling", "index", "object"],
              "alphabetize": {
                "order": "asc",
                "caseInsensitive": true
              }
            }
          ]
        }
      }

    ```

# Prettier 세팅
  - .prettierrc

  ``` json
  {
    "useTabs": false,
    "printWidth": 80,
    "tabWidth": 2,
    "singleQuote": true,
    "trailingComma": "all",
    "endOfLine": "lf",
    "semi": false,
    "arrowParens": "always"
  }
  ```

  - yarn dlx @yarnpkg/sdks vscode



# emotion 세팅
- yarn add @emotion/react @emotion/styled
- yarn add -D @emotion/babel-plugin @babel/preset-react

- babel 설정

    .babelrc
    ``` js
    {
      "presets": [
        [
          "next/babel",
          {
            "preset-react": {
              "runtime": "automatic",
              "importSource": "@emotion/react"
            }
          }
        ]
      ]
    }
    ```

    - tsconfig 설정

    tsconfig.json
    ```json
    "compilerOptions": {
      "jsxImportSource": "@emotion/react"
    }
    ```

  
# FireBase 세팅
- [firebase](https://console.firebase.google.com/)
- 프로젝트 생성 후 웹 서비스 추가


- tsconfig.json 하단 코드 paths추가
``` json
{
  "extends": "./tsconfig.paths.json",
  "include": [
    "tsconfig.paths.json"
  ],  
}
```