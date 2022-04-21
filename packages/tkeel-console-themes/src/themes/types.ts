import { ColorHues } from '@chakra-ui/react';

import type { BaseTheme } from './base-extension';

export type Colors = {
  primary: string;
  brand?: ColorHues;
};

export type Theme = BaseTheme & {
  colors: Colors;
};
