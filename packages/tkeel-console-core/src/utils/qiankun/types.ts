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
  props?: Record<string, unknown>;
}
