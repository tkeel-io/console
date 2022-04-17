import { Image } from '@chakra-ui/react';

import { usePortalAdminConfigQuery } from '@tkeel/console-request-hooks';

export default function LogoTypeLight() {
  const { config } = usePortalAdminConfigQuery();
  const { logoTypeLight } = config?.client || {};
  return logoTypeLight ? (
    <Image width="194px" height="52px" src={logoTypeLight} />
  ) : null;
}
