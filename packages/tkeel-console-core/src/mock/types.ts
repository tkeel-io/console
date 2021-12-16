export interface IMenuDetail {
  id: string;
  name: string;
  icon: string;
  path?: string;
  entry?: string | { scripts?: string[]; styles?: string[]; html?: string };
  children?: IMenuDetail[];
}

export interface IEntryData {
  entries: IEntry[];
}

export interface IEntry {
  id: string;
  name: string;
  icon: string;
  path: string;
  entry: string;
  menu: string[];
}

export interface IMenu {
  categoryId: string;
  categoryName?: string;
  menus: IMenuDetail[];
}
