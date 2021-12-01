export interface IActiveRuleFunction {
  (location: Location): boolean;
}

export interface IApp {
  name: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
  container: string;
  // string | HTMLElement;
  activeRule: string;
  // | string
  // | IActiveRuleFunction
  // | Array<string | IActiveRuleFunction>;
  loader?: (loading: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<any, any>;
}
