export const AUTH_TYPE_MAP = {
  internal: {
    name: '平台默认',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
  },
  external: {
    name: '第三方',
    description:
      '用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。',
  },
};

export const AUTH_TYPES = Object.entries(AUTH_TYPE_MAP).map(
  ([key, { name, description }]) => ({ key, name, description })
);

export const DEFAULT_AUTH_TYPE = 'internal';
