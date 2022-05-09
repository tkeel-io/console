import { Text } from '@chakra-ui/react';

import { LoginBrand } from '@tkeel/console-business-components';

import { BrandProps } from './types';

export default function Brand({
  tenantInfo,
  config,
  align,
  styles,
}: BrandProps) {
  const clientConfig = config?.client;
  const tenantTitle = tenantInfo?.title ?? '';

  return (
    <LoginBrand
      align={align}
      logo={clientConfig?.logoMark ?? ''}
      title={
        <>
          您好，欢迎进入
          <Text display="inline" color="primary">
            {tenantTitle}
          </Text>
          ！
        </>
      }
      slogan={clientConfig?.slogan ?? ''}
      styles={styles}
    />
  );
}
