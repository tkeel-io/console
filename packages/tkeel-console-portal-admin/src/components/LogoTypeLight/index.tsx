import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeLight() {
  const { config } = usePortalAdminConfigPortalQuery();
  return <Image width="189px" src={config?.client.logoTypeLight} />;
}
