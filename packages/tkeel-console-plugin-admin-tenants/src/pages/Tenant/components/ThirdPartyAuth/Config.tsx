import { Box, Button, Flex, HStack, Text, useTheme } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// import { useParams } from 'react-router-dom';
import { AceEditor } from '@tkeel/console-components';
import { InformationFilledIcon } from '@tkeel/console-icons';
import { Theme } from '@tkeel/console-themes';

// import { plugin } from '@tkeel/console-utils';
// import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';
// import useAuthIdProviderTemplateQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderTemplateQuery';
import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

// import ConfigModal from './ConfigModal';

const buttonStyleProps = {
  borderRadius: '2px',
  height: '32px',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '24px',
};

export default function Config() {
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const { colors }: Theme = useTheme();
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
          {/* TODO: temp */}
          {/* <Flex alignItems="center" paddingLeft="12px">
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
          </Flex> */}
        </Flex>
        <Box paddingTop="12px">
          <AceEditor
            theme="light"
            value={yaml}
            language="yaml"
            readOnly={currentMode === 'view'}
            height="316px"
          />
        </Box>
      </Box>
      <Flex
        justifyContent="flex-end"
        paddingTop="12px"
        visibility={currentMode === 'view' ? 'visible' : 'hidden'}
      >
        <InformationFilledIcon size="16px" color={colors.primary} />
        <Text
          padding="0 4px"
          fontSize="12px"
          lineHeight="150%"
          color="gray.500"
        >
          如需编辑配置文件，请点击下方编辑按钮
        </Text>
      </Flex>
      <HStack padding="16px 0 24px" spacing="8px">
        {currentMode === 'view' && (
          <Button
            {...buttonStyleProps}
            colorScheme="brand"
            onClick={() => {
              setCurrentMode('edit');
            }}
          >
            编辑
          </Button>
        )}
        {currentMode === 'edit' && (
          <>
            <Button {...buttonStyleProps} colorScheme="brand">
              保存
            </Button>
            <Button
              {...buttonStyleProps}
              colorScheme="gray"
              backgroundColor="gray.800"
              onClick={() => {
                setCurrentMode('view');
              }}
            >
              取消
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
}
