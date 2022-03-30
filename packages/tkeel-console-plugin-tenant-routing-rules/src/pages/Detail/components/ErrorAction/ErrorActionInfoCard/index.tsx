import {
  Circle,
  Flex,
  HStack,
  StyleProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';
import {
  MessageWarningTwoToneIcon,
  PencilFilledIcon,
  TrashFilledIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAddErrorActionMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useAddErrorActionMutation';
import useDeleteErrorActionMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteErrorActionMutation';
import { ApiData as ErrorAction } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useErrorActionQuery';

import ErrorActionModal from '../ErrorActionModal';

type Props = {
  ruleId: string;
  errorAction: ErrorAction;
  refetchDetail: () => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function ErrorActionInfoCard({
  ruleId,
  errorAction,
  refetchDetail,
  styles,
}: Props) {
  const {
    isOpen: isAlertOpen,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const toast = plugin.getPortalToast();

  const handleSuccess = (text: string) => {
    toast(text, { status: 'success' });
    onModalClose();
    refetchDetail();
  };

  const { mutate: editMutate, isLoading: isEditErrorActionLoading } =
    useAddErrorActionMutation({
      method: 'PUT',
      ruleId,
      onSuccess() {
        handleSuccess('编辑错误操作成功');
      },
    });

  const { mutate: deleteMutate, isLoading: isDeleteErrorActionLoading } =
    useDeleteErrorActionMutation({
      ruleId,
      onSuccess() {
        handleSuccess('删除错误操作成功');
      },
    });

  const handleSubmit = (subscribeId: string) => {
    if (ruleId && subscribeId) {
      editMutate({
        data: {
          subscribe_id: subscribeId,
        },
      });
    }
  };

  const handleConfirm = () => {
    if (ruleId) {
      deleteMutate({});
    }
  };

  return (
    <Flex
      alignItems="center"
      height="83px"
      paddingLeft="16px"
      paddingRight="35px"
      border="1px"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
      _hover={{
        '.chakra-stack': {
          display: 'flex',
        },
      }}
      {...styles?.wrapper}
    >
      <Flex alignItems="center">
        <MessageWarningTwoToneIcon
          size={30}
          color="gray.700"
          twoToneColor="gray.300"
        />
        <Text marginLeft="12px" color="gray.700" fontSize="14px">
          将数据及错误记录发送到订阅
        </Text>
      </Flex>
      <Text
        flex="1"
        marginLeft="97px"
        color="grayAlternatives.700"
        fontSize="14px"
        isTruncated
        title={errorAction.title}
      >
        {errorAction.title}：{errorAction.endpoint}
      </Text>
      <HStack display="none" spacing="20px">
        <PencilFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
          onClick={() => onModalOpen()}
        />
        <TrashFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
          onClick={() => onAlertOpen()}
        />
      </HStack>
      <ErrorActionModal
        defaultSubscribeId={errorAction.id}
        isOpen={isModalOpen}
        onClose={onModalClose}
        isLoading={isEditErrorActionLoading}
        handleSubmit={handleSubmit}
      />
      <Alert
        iconPosition="left"
        icon={
          <Circle size="44px" backgroundColor="red.50">
            <TrashFilledIcon size="24px" color="red.300" />
          </Circle>
        }
        title={`确认删除错误操作「${errorAction.title || ''}」？`}
        isOpen={isAlertOpen}
        isConfirmButtonLoading={isDeleteErrorActionLoading}
        onClose={onAlertClose}
        onConfirm={handleConfirm}
      />
    </Flex>
  );
}
