export interface IActiveRuleFunction {
  (location: Location): boolean;
}

export interface IApp {
  name: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
  container: string | HTMLElement;
  activeRule:
    | string
    | IActiveRuleFunction
    | Array<string | IActiveRuleFunction>;
  loader?: (loading: boolean) => void;
  props?: Record<any, any>;
}
