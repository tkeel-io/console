import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AceEditor } from '@tkeel/console-components';
import { useColors } from '@tkeel/console-hooks';
import { InformationFilledIcon } from '@tkeel/console-icons';
import { IdProviderType } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import useAuthIdProviderRegisterMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useAuthIdProviderRegisterMutation';
import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

const buttonStyleProps = {
  borderRadius: '2px',
  height: '32px',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '24px',
};

export default function Config() {
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const [config, setConfig] = useState<string>('');
  const colors = useColors();
  const { tenantId = '' } = useParams();

  const {
    isLoading: isQueryLoading,
    data: currentData,
    refetch,
  } = useAuthIdProviderQuery({
    tenantId,
    onSuccess: ({ data }) => {
      const configByServer = Base64.decode(data?.config ?? '');
      setConfig(configByServer);
    },
  });

  const handleChange = (value: string) => {
    setConfig(value);
  };

  const { isLoading: isMutationLoading, mutate } =
    useAuthIdProviderRegisterMutation({
      tenantId,
      onSuccess: () => {
        const toast = plugin.getPortalToast();
        toast.success('设置成功');
        setCurrentMode('view');
        refetch();
      },
    });

  const handleSubmit = () => {
    mutate({
      data: {
        type: currentData?.type as IdProviderType,
        config: Base64.encode(config),
      },
    });
  };

  const handleCancel = () => {
    setConfig(Base64.decode(currentData?.config ?? ''));
    setCurrentMode('view');
  };

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
        </Flex>
        <Box paddingTop="12px">
          <AceEditor
            theme="light"
            value={config}
            language="yaml"
            readOnly={currentMode === 'view'}
            height="316px"
            onChange={handleChange}
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
            isDisabled={isQueryLoading}
            onClick={() => {
              setCurrentMode('edit');
            }}
          >
            编辑
          </Button>
        )}
        {currentMode === 'edit' && (
          <>
            <Button
              {...buttonStyleProps}
              colorScheme="brand"
              isLoading={isMutationLoading}
              onClick={handleSubmit}
            >
              保存
            </Button>
            <Button
              {...buttonStyleProps}
              colorScheme="gray"
              backgroundColor="gray.800"
              onClick={handleCancel}
            >
              取消
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
}
