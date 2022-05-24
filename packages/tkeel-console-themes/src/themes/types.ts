import { ColorHues } from '@chakra-ui/react';

import type { BaseTheme } from './base-extension';

type BaseColors = BaseTheme['colors'];

interface Colors extends Readonly<BaseColors> {
  primary: string;
  brand: ColorHues;
}

interface Theme extends BaseTheme {
  colors: Colors;
}

export type { Colors, Theme };
