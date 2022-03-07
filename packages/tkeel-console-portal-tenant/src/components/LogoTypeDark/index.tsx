import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalTenantConfigPortalQuery();
  return <Image width="189px" src={config?.client.logoTypeDark} />;
}
