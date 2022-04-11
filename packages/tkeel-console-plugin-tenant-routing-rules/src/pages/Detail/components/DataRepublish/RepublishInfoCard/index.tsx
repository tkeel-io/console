import {
  Box,
  Circle,
  Flex,
  HStack,
  Image,
  StyleProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import kafkaImg from '@/tkeel-console-plugin-tenant-routing-rules/assets/images/kafka.svg';
import useCreateRuleTargetMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRuleTargetMutation';
import useDeleteTargetMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteTargetMutation';
import { Target } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleTargetsQuery';

import RepublishToKafkaModal, {
  FormValues as KafkaRepublishInfo,
} from '../RepublishToKafkaModal';

type Props = {
  ruleId: string;
  target: Target;
  refetchData: () => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function RepublishInfoCard({
  ruleId,
  target,
  refetchData,
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
    refetchData();
  };

  const { mutate: editMutate, isLoading: isEditRuleTargetLoading } =
    useCreateRuleTargetMutation({
      method: 'PUT',
      ruleId,
      targetId: target.id,
      onSuccess() {
        handleSuccess('编辑转发成功');
      },
    });

  const { mutate: deleteMutate, isLoading: isDeleteTargetLoading } =
    useDeleteTargetMutation({
      onSuccess() {
        handleSuccess('删除转发成功');
      },
    });

  const handleSubmit = ({ address, topic }: KafkaRepublishInfo) => {
    if (ruleId && target.id) {
      editMutate({
        data: {
          host: address,
          value: topic,
        },
      });
    }
  };

  const handleConfirm = () => {
    if (ruleId && target.id) {
      deleteMutate({
        url: `/rule-manager/v1/rules/${ruleId}/target/${target.id}`,
      });
    }
  };

  return (
    <Flex
      alignItems="center"
      height="83px"
      paddingLeft="16px"
      paddingRight="35px"
      borderWidth="1px"
      borderStyle="solid"
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
      <Box width="5px" height="40px" backgroundColor="success.300" />
      <Image marginLeft="20px" width="95px" src={kafkaImg} />
      <Text
        flex="1"
        marginLeft="200px"
        color="grayAlternatives.700"
        fontSize="14px"
        isTruncated
        title={target.value}
      >
        主题 Topic：{target.value}
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
      <RepublishToKafkaModal
        info={{ address: target.host, topic: target.value }}
        isOpen={isModalOpen}
        onClose={onModalClose}
        handleSubmit={handleSubmit}
        isLoading={isEditRuleTargetLoading}
      />
      <Alert
        iconPosition="left"
        icon={
          <Circle size="44px" backgroundColor="red.50">
            <TrashFilledIcon size="24px" color="red.300" />
          </Circle>
        }
        title={`确认删除转发「${target.value || ''}」？`}
        isOpen={isAlertOpen}
        isConfirmButtonLoading={isDeleteTargetLoading}
        onClose={onAlertClose}
        onConfirm={handleConfirm}
      />
    </Flex>
  );
}
