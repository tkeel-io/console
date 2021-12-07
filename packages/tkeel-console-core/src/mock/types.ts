export interface IMenuDetail {
  id: string;
  name: string;
  path?: string;
  entry?: string | { scripts?: string[]; styles?: string[]; html?: string };
  children?: IMenuDetail[];
}

export interface IMenu {
  categoryId: string;
  categoryName?: string;
  menus: IMenuDetail[];
}
