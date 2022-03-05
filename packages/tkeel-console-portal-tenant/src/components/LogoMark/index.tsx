import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function LogoMark() {
  const { config } = usePortalTenantConfigPortalQuery();
  return <Image width="40px" src={config?.client.logoMark} />;
}
