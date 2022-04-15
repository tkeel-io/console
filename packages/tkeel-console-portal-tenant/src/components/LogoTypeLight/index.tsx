import { Image } from '@chakra-ui/react';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeLight() {
  const { config } = usePortalTenantConfigQuery();
  return (
    <Image width="161px" height="52px" src={config?.client.logoTypeLight} />
  );
}
