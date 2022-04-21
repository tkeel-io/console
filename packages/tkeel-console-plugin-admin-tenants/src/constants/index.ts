export const AUTH_TYPE_MAP = {
  internal: {
    label: '平台默认',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
  },
  external: {
    label: '第三方',
    description:
      '用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。',
  },
} as const;

export const AUTH_TYPES = Object.entries(AUTH_TYPE_MAP).map(
  ([value, rest]) => ({ value, ...rest })
);

export const DEFAULT_AUTH_TYPE_VALUE = 'internal';

export const ID_PROVIDER_TYPES = [
  { value: 'OIDC', label: 'OIDC', isDisabled: false },
  { value: 'LDAP', label: 'LDAP', isDisabled: true },
  { value: 'SAML', label: 'SAML', isDisabled: true },
];
