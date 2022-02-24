export interface Config {
  pages: {
    LoginTenant: {
      backgroundImage: string;
      title: string;
      description: string;
    };
    SetPassword: {
      backgroundImage: string;
      brandName: string;
      title: string;
      subTitle: string;
    };
  };
}

export interface Configs {
  'qingcloud-light': Config;
  'tkeel-light': Config;
}
