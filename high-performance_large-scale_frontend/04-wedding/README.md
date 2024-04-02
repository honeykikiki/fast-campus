# 프로젝트 환경 구성
- Boilerplate = create react-app
- Rules = ESLint + Prettier
- Style = SCSS
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
yarn create react-app 04-wedding --template typescript
node_modules 삭제

❯ yarn set version <version> || berry
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


# ESLint 세팅
  - yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app eslint-plugin-simple-import-sort
  - Config 설정 분리
  - yarn add @yarnpkg/sdks vscode

  - .eslintrc 세팅
    - package.json 에서 eslintConfig 내부에 내용을 지우고
    - .eslintrc 파일을 추가하고
    - 하단의 내용을 추가해준다.

    ``` json
      {
        "extends": ["react-app", "react-app/jest", "plugin:prettier/recommended"],
        "plugins": ["prettier", "simple-import-sort"],
        "rules": {
          "prettier/prettier": "error",
          // import 정렬 순서
          "import/order": [
            "error",
            {
              "groups": ["builtin", "external", "internal", ["parent", "type"], "sibling", "index", "object"],
              // 정렬순서
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


# Craco 세팅
- Craco는 Create react-app에 Configuration Override의 약어로 CRA에 config 설정을 덮어쓰기 위한 패키지
<a href="https://craco.js.org/">https://craco.js.org/</a>

yarn add -D @craco/craco craco-alias

- tsconfig.paths.json
``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components"]
    }
  }
}
```

- corco.config.js
``` javascript
const CrocoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CrocoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfing.paths.js',
      },
    },
  ],
}

```
- tsconfig.json 하단 코드 추가
``` json
{
  "extends": "./tsconfig.paths.json",
  "include": [
    "tsconfig.paths.json"
  ],  
}

```


# SCSS 세팅
- yarn add classnames sass

# JSON Server 세팅
<a href="https://github.com/typicode/json-server">https://github.com/typicode/json-server</a>

- REST 는 웹의 기본 프로토콜인 HTTP를 기반으로 구현되며, HTTP 메서드와 URL 을 이용하여 자원과 하고자하는 행동을 표현합니다
- REST API는 REST 한 방식으로 설계된 API 입니다
- Json Server는 JSON 파일을 이용하여 Rest API 서버를 빠르고 간단하게 생성하기 위한 도구입니다.

- JSON Server 설치
  > yarn add -D json-server
- db.json 생성
- package.json 에 명령어 추가
  - script에 코드 추가
``` json
"scripts": { 
  "dev:db": "json-server db.json --watch --port=8888"
}
```

# font 세팅
- 웹 폰트 서비스 이용
  - 웹서버에서 가져오기 떄문에 오래걸리는 이슈가 있음
ex: <link href="폰트 서비스 url">

- 웹 폰트 서비스 이용
  - 다운로드 방식
ex: 
``` css
@font-face { font-family: "폰트이름"; src: url("폰트경로"); }
```