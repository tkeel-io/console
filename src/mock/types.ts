export interface IMenu {
  id: string;
  name: string;
  path: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
}
