import { NavigateFunction } from 'react-router-dom';
import { PlatformNames } from '@tkeel/console-constants';

import { TokenInfo } from './auth';

export interface PluginGlobalProps {
  container?: HTMLElement;
  platformName: PlatformNames;
  tokenInfo: TokenInfo;
  navigate: NavigateFunction;
  themeName: string;
  theme: Record<string, unknown>;
  refetchMenus: () => void;
}
