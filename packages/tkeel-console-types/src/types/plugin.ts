import { NavigateFunction } from 'react-router-dom';
import { PlatformNames } from '@tkeel/console-constants';

import { TokenData } from './auth';

export interface PluginGlobalProps {
  container?: HTMLElement;
  platformName: PlatformNames;
  tokenData: TokenData;
  navigate: NavigateFunction;
  themeName: string;
  theme: Record<string, unknown>;
}
