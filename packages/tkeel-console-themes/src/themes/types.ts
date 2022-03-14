import type { BaseTheme } from './base-extension';

export type Theme = BaseTheme & {
  colors: {
    primary: string;
    primarySub1: string;
    primarySub2: string;
    primarySub3: string;
  };
};
