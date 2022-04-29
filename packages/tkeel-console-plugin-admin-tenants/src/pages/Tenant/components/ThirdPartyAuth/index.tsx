import { Button, Flex, Text, useTheme } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { PageHeaderToolbar, Select } from '@tkeel/console-components';
import { InformationFilledIcon } from '@tkeel/console-icons';
import { Theme } from '@tkeel/console-themes';
import { plugin } from '@tkeel/console-utils';

import { ID_PROVIDER_TYPES } from '@/tkeel-console-plugin-admin-tenants/constants';
import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

import Config from './Config';

export default function ThirdPartyAuth() {
  const { colors }: Theme = useTheme();

  const { tenantId = '' } = useParams();
  const { data } = useAuthIdProviderQuery({ tenantId });
  const type = data?.type;

  const documents = plugin.getPortalDocuments();

  return (
    <Flex flexDirection="column">
      <PageHeaderToolbar
        name="单点登录"
        hasSearchInput={false}
        styles={{ wrapper: { margin: '4px 0' } }}
      />
      <Flex alignItems="center">
        <Flex alignItems="center">
          <Text
            paddingRight="8px"
            fontSize="12px"
            lineHeight="150%"
            color="gray.700"
          >
            认证协议：
          </Text>
          <Select
            id="id_provider_type"
            options={ID_PROVIDER_TYPES}
            value={type}
            disabled
          />
        </Flex>
        <Flex alignItems="center" paddingLeft="12px">
          <InformationFilledIcon size="16px" color={colors.primary} />
          <Text
            padding="0 4px"
            fontSize="12px"
            lineHeight="150%"
            color="gray.500"
          >
            平台支持多种认证协议，协议选择后不可修改，您可以在下方配置认证协议
            {/* ，详细说明请参见文档 */}
          </Text>
          <Button
            display="none"
            variant="link"
            fontSize="12px"
            lineHeight="150%"
            color="primary"
            _hover={{ opacity: 0.7 }}
            onClick={() => {
              // TODO: need docs
              documents.open('');
            }}
          >
            文档
          </Button>
        </Flex>
      </Flex>
      <Config />
    </Flex>
  );
}
