import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalAdminConfigQuery();
  return <Image width="189px" src={config?.client.logoTypeDark} />;
}
