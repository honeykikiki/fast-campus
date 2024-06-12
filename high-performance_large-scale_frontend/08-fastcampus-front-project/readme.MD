# 디자인 시스템

# esbuild를 이용한 모듈 구축

- esbuild 라이브러리 추가
- esbuild 세팅
``` js
  import esbuild from "esbuild";
  import pkg from "./package.json" assert { type: "json" };

  const dev = process.argv.includes("--dev");
  const minify = !dev;

  const watch = process.argv.includes("--watch");

  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const baseConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify,
    sourcemap: true,
    outdir: "dist",
    target: "es2019",
    watch,
    external,
  };

  Promise.all([
    esbuild.build({
      ...baseConfig,
      format: "esm",
    }),

    esbuild.build({
      ...baseConfig,
      format: "cjs",
      outExtension: {
        ".js": ".cjs",
      },
    }),
  ]).catch((e) => {
    console.error(e);
    process.exit(1);
  });

  // commonjs es module

```

- ts 사용을 위한 tsconfig 세팅
``` json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "declaration": true,
    "strict": true,
    "moduleResolution": "Node",
    "jsx": "react-jsx"
  }
}
```

### 폴더 구조 - 컬러
- ./package/themes/src/variables/colors/static/light.ts

- css로 변환하는 스크립트