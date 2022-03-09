import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoMark() {
  const { config } = usePortalTenantConfigQuery();
  return <Image width="40px" src={config?.client.logoMark} />;
}
