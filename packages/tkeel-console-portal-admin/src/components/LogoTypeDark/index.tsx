import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeDark() {
  const { config } = usePortalAdminConfigQuery();
  const { logoTypeDark } = config?.client || {};
  return logoTypeDark ? <Image width="189px" src={logoTypeDark} /> : null;
}
