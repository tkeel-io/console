import { Text } from '@chakra-ui/react';

import LoginBrand from '../LoginBrand';
import type { BrandProps } from './types';

export default function Brand({
  tenantInfo,
  config,
  align,
  styles,
}: BrandProps) {
  const tenantTitle = tenantInfo?.title ?? '';

  return (
    <LoginBrand
      align={align}
      logo={config?.common.logoMark ?? ''}
      title={
        <>
          您好，欢迎进入
          <Text display="inline" color="primary">
            {tenantTitle}
          </Text>
          ！
        </>
      }
      slogan={config?.common.slogan}
      styles={styles}
    />
  );
}
