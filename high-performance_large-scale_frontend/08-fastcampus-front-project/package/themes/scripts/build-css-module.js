import * as theme from "../dist/index.js";
import fs from "fs";

const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

// 컬러 정보 css로 파싱
const generateThemeCssVariables = () => {
  const cssString = [];
  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          const selector = ":root";

          const colorVariable = Object.entries(colorValue)
            .map(([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(
                  ([subKey, subValue]) =>
                    `\t--${toCssCasting(mainKey)}-${subKey}: ${subValue};`
                )
                .join("\n")
            )
            .join("\n");

          cssString.push(`${selector} {\n${colorVariable}\n}`);
        }

        if (colorKey === "dark") {
          const selector = ":root .theme-dark";

          const colorVariable = Object.entries(colorValue)
            .map(([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(
                  ([subKey, subValue]) =>
                    `\t--${toCssCasting(mainKey)}-${subKey}: ${subValue};`
                )
                .join("\n")
            )
            .join("\n");

          cssString.push(`${selector} {\n${colorVariable}\n}`);
        }
      });
    }
  });

  return cssString;
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();

  fs.writeFileSync("dist/themes.css", [...variables].join("\n"));
};

generateThemeCss();
