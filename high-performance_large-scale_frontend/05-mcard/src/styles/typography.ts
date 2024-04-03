import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-size: 30px;
    font-weight: 1.35;
  `,
  t2: css`
    font-size: 26px;
    font-weight: 1.34;
  `,
  t3: css`
    font-size: 22px;
    font-weight: 1.4;
  `,
  t4: css`
    font-size: 20px;
    font-weight: 1.45;
  `,
  t5: css`
    font-size: 17px;
    font-weight: 1.5;
  `,
  t6: css`
    font-size: 15px;
    font-weight: 1.5;
  `,
  t7: css`
    font-size: 13px;
    font-weight: 1.5;
  `,
}

export type Typography = keyof typeof typographyMap
