import { ColorHues, Colors as ChakraColors } from '@chakra-ui/react';

import type { BaseTheme } from './base-extension';

export type Colors = ChakraColors & {
  primary: string;
  whiteAlpha: ColorHues;
  blackAlias: string;
  whiteAlias: string;
  brand: ColorHues;
  grayAlternatives: ColorHues;
};

export type Theme = BaseTheme & {
  colors: Colors;
};
