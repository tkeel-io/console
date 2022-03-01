export interface Config {
  documentTiles: {
    admin: string;
    tenant: string;
  };
  pages: {
    AdminTenant: {
      backgroundImage: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
    };
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
