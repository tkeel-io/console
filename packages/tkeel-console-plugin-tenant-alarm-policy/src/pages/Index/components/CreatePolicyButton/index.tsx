import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Alert, CreateButton } from '@tkeel/console-components';

import useCreatePolicyMutation from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

import ConfigureNotificationModal from '../ConfigureNotificationModal';
import CreateTenantModal from '../CreatePolicyModal';

interface Props {
  refetch: () => unknown;
}

export default function CreatePolicyButton({ refetch }: Props) {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowNotificationModal, setIsShowNotificationModal] = useState(false);

  const { mutate, isLoading } = useCreatePolicyMutation({
    onSuccess() {
      setIsShowAlert(true);
      onClose();
      refetch();
    },
  });

  return (
    <>
      <CreateButton onClick={onOpen}>添加告警策略</CreateButton>
      {isModalOpen && (
        <CreateTenantModal
          isOpen={isModalOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(data) => {
            mutate({
              data,
            });
          }}
        />
      )}
      <Alert
        isOpen={isShowAlert}
        iconPosition="left"
        icon="success"
        hasCancelButton={false}
        title={
          <Flex
            alignItems="center"
            color="gray.800"
            fontSize="14px"
            fontWeight="600"
          >
            <Text>已成功创建策略，可继续为该策略</Text>
            <Text
              marginLeft="4px"
              color="primary"
              onClick={() => setIsShowNotificationModal(true)}
            >
              配置通知
            </Text>
          </Flex>
        }
        description="策略配置通知后，请开启该策略的状态"
        onClose={() => setIsShowAlert(false)}
        onConfirm={() => {
          setIsShowAlert(false);
        }}
      />
      {isShowNotificationModal && (
        <ConfigureNotificationModal
          isOpen={isShowNotificationModal}
          onClose={onClose}
        />
      )}
    </>
  );
}
