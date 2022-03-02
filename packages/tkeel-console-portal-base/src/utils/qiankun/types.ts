import { GlobalPluginProps } from '@tkeel/console-types';

export interface MenuInfo {
  id: string;
  name: string;
  path: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
}

export interface ActiveRuleFunction {
  (location: Location): boolean;
}

export interface App {
  name: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
  container: string;
  activeRule: string;
  loader?: (loading: boolean) => void;
  props?: GlobalPluginProps;
}
