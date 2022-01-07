export interface RequestData {
  admin: {
    username: string;
    password: string;
  };
  remark: string;
  title: string;
}

export interface ApiData {
  tenant_id: number;
  title: string;
  remark: string;
  admin: {
    tenant_id: number;
    username: string;
    password: string;
    nick_name: string;
    avatar: string;
    email: string;
  };
}
