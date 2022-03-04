import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigPortalQuery } from '@tkeel/console-request-hooks';

export default function LogoMark() {
  const { config } = usePortalAdminConfigPortalQuery();
  return <Image width="40px" src={config?.client.logoMark} />;
}
