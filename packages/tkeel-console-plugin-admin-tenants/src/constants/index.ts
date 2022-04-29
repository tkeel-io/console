export const AUTH_TYPE_MAP = {
  internal: {
    label: '平台默认',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
  },
  external: {
    label: '单点登录',
    description:
      '用户的管理在第三方，平台支持 OIDC / LDAP / SAML 三种单点登录认证协议。',
  },
} as const;

export const AUTH_TYPES = Object.entries(AUTH_TYPE_MAP).map(
  ([value, rest]) => ({ value, ...rest })
);

export const DEFAULT_AUTH_TYPE_VALUE = 'internal';

export const ID_PROVIDER_TYPES = [
  { value: 'OIDC', label: 'OIDC', disabled: false },
  { value: 'LDAP', label: 'LDAP', disabled: true },
  { value: 'SAML', label: 'SAML', disabled: true },
];
