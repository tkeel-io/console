import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import {
  IconButton,
  PageHeaderToolbar,
  Select,
} from '@tkeel/console-components';
import { InformationFilledIcon, PencilTwoToneIcon } from '@tkeel/console-icons';
import { Theme } from '@tkeel/console-themes';
import { plugin } from '@tkeel/console-utils';

import { ID_PROVIDER_TYPES } from '@/tkeel-console-plugin-admin-tenants/constants';
import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

import Config from './Config';
import CreateConfigButton from './CreateConfigButton';

export default function ThirdPartyAuth() {
  const { colors }: Theme = useTheme();
  const { onOpen: onOIDCModalOpen } = useDisclosure();

  const { tenantId = '' } = useParams();
  const { data, refetch } = useAuthIdProviderQuery({ tenantId });
  const type = data?.type;
  const config = data?.config;

  const documents = plugin.getPortalDocuments();

  return (
    <Flex flexDirection="column">
      <PageHeaderToolbar
        name="第三方认证"
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
            物联网支持多种第三方认证协议，认证协议选中后不可修改，您可以在下方配置认证协议
            {/* 详细说明请参见 */}
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

      <Box display="none" padding="8px 0 12px">
        {config ? (
          <>
            <IconButton
              marginLeft="24px"
              border="1px solid"
              borderColor="gray.200"
              backgroundColor="gray.50"
              fontSize="12px"
              fontWeight="20px"
              lineHeight="400"
              color="gray.800"
              variant="outline"
              colorScheme="gray"
              icon={<PencilTwoToneIcon size="16px" />}
              onClick={() => {
                onOIDCModalOpen();
              }}
            >
              编辑
            </IconButton>
            <Config />
          </>
        ) : (
          <Box borderRadius="4px" padding="12px" backgroundColor="gray.50">
            <CreateConfigButton
              onSuccess={() => {
                const toast = plugin.getPortalToast();
                toast.success('设置成功');
                refetch();
              }}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
}
