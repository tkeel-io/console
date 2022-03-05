import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalAdminConfigPortalQuery();
  return <Image width="189px" src={config?.client.logoTypeDark} />;
}
