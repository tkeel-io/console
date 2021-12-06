export interface ISubMenu {
  id: string;
  name: string;
  path: string;
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
}

export interface IMenu {
  categoryId: string;
  categoryName?: string;
  subMenus: ISubMenu[];
}
