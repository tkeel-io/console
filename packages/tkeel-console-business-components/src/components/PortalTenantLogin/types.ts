import { StyleProps } from '@chakra-ui/react';

import type { Appearance } from '@tkeel/console-constants';
import type { AuthType } from '@tkeel/console-types';

interface BaseProps {
  tenantInfo?: {
    auth_type: AuthType;
    title: string;
  };
  config?: Appearance;
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

  mockData?: {
    username: string;
    password: string;
  };
}

interface PasswordFormProps extends BaseProps {
  isLoading?: boolean;
  onSubmit: OnPasswordFormSubmit;
  mockData?: {
    username: string;
    password: string;
  };
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
