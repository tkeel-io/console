import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalTenantConfigQuery();
  const { logoTypeDark } = config?.client || {};
  return logoTypeDark ? <Image width="189px" src={logoTypeDark} /> : null;
}
