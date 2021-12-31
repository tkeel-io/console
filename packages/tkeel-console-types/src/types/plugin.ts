import { TokenData } from './auth';

export interface PluginProps {
  container?: HTMLElement;
  tokenData?: TokenData;
  themeName?: string;
  theme?: Record<string, unknown>;
}
