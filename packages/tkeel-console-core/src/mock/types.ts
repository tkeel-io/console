export interface IMenu {
  id: string;
  name: string;
  icon?: string;
  path?: string;
  entry?: string | { scripts?: string[]; styles?: string[]; html?: string };
  children?: IMenu[];
}

export interface IData {
  '@type': string;
  entries: IMenu[];
}
