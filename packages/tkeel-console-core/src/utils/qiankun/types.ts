export interface IMenuInfo {
  id: string;
  name: string;
  path: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
}

export interface IActiveRuleFunction {
  (location: Location): boolean;
}

export interface IApp {
  name: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
  container: string;
  activeRule: string;
  loader?: (loading: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}
