export interface Theme {
  pages: {
    LoginTenant: {
      backgroundImage: string;
      title: string;
      description: string;
    };
  };
}

export interface Themes {
  'qingcloud-light': Theme;
  'tkeel-light': Theme;
}
