import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoMark() {
  const { config } = usePortalAdminConfigQuery();
  return <Image width="40px" src={config?.client.logoMark} />;
}
