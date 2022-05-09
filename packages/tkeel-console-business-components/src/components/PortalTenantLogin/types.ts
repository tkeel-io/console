import { StyleProps } from '@chakra-ui/react';

import type { PortalTenantConfig } from '@tkeel/console-request-hooks';
import type { AuthType } from '@tkeel/console-types';

interface BaseProps {
  tenantInfo?: {
    auth_type: AuthType;
    title: string;
  };
  config?: PortalTenantConfig;
}

interface OnPasswordFormSubmit {
  (formValues: { username: string; password: string }): void;
}

interface TenantLoginProps extends BaseProps {
  isPasswordFormLoading?: boolean;
  isThirdPartyAuthFormLoading?: boolean;
  onLogoutTenantClick?: () => void;
  onPasswordFormSubmit?: OnPasswordFormSubmit;
  onThirdPartyAuthFormSubmit?: () => void;
}

interface PasswordFormProps extends BaseProps {
  isLoading?: boolean;
  onSubmit: OnPasswordFormSubmit;
}

interface ThirdPartyAuthFormProps extends BaseProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

interface BrandProps extends BaseProps {
  align?: 'center';
  styles?: {
    root?: StyleProps;
  };
}

export type {
  BrandProps,
  PasswordFormProps,
  TenantLoginProps,
  ThirdPartyAuthFormProps,
};
