import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { useParams } from 'react-router-dom';

// import { useParams } from 'react-router-dom';
import { AceEditor } from '@tkeel/console-components';

// import { plugin } from '@tkeel/console-utils';
// import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';
// import useAuthIdProviderTemplateQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderTemplateQuery';
import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

// import ConfigModal from './ConfigModal';

export default function Config() {
  const { tenantId = '' } = useParams();
  const { data } = useAuthIdProviderQuery({ tenantId });
  /* const { data } = useAuthIdProviderTemplateQuery({
    params: { type: 'OIDC' },
  }); */
  const config = data?.config ?? '';
  const yaml = Base64.decode(config);

  // const { tenantId = '' } = useParams();
  /* const { isLoading, mutate } = useAuthIdProviderRegisterMutation({
    tenantId,
    onSuccess: () => {
      const toast = plugin.getPortalToast();
      toast.success('设置成功');
      onModalClose();
      refetch();
    },
  }); */

  return (
    <Box marginTop="16px">
      <Box
        border="1px solid"
        borderColor="grayAlternatives.50"
        borderRadius="4px"
        padding="12px"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontWeight="700"
            fontSize="12px"
            lineHeight="20px"
            color="gray.700"
          >
            协议配置
          </Text>
          <Flex alignItems="center" paddingLeft="12px">
            <Text
              paddingRight="4px"
              fontSize="12px"
              lineHeight="24px"
              color="gray.500"
            >
              请使用模版，在这里
            </Text>
            <Button
              variant="link"
              fontSize="12px"
              lineHeight="24px"
              color="primary"
              _hover={{ opacity: 0.7 }}
              onClick={() => {}}
            >
              复制模版代码
            </Button>
          </Flex>
        </Flex>
        <Box paddingTop="12px">
          <AceEditor
            theme="light"
            value={yaml}
            language="yaml"
            readOnly
            height="316px"
          />
        </Box>
      </Box>
      <Flex paddingTop="16px">
        <Button>编辑</Button>
      </Flex>
    </Box>
  );
}
