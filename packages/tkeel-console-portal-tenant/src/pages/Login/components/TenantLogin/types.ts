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

interface TenantLoginProps extends BaseProps {
  isPreview?: boolean;
}

interface PasswordFormProps extends BaseProps {
  isPreview?: boolean;
}

interface ThirdPartyAuthFormProps extends BaseProps {
  isPreview?: boolean;
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
