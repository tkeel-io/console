import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalTenantConfigQuery();
  return <Image width="189px" src={config?.client.logoTypeDark} />;
}
