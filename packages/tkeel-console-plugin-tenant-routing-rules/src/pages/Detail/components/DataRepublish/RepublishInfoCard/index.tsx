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
import { useState } from 'react';

import { Alert } from '@tkeel/console-components';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import clickHouseImg from '@/tkeel-console-plugin-tenant-routing-rules/assets/images/click-house.svg';
import kafkaImg from '@/tkeel-console-plugin-tenant-routing-rules/assets/images/kafka.svg';
import mysqlImg from '@/tkeel-console-plugin-tenant-routing-rules/assets/images/mysql.svg';
import useCreateRuleTargetMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRuleTargetMutation';
import useDeleteTargetMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteTargetMutation';
import { Target } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleTargetsQuery';

import RepublishToKafkaModal, {
  FormValues as KafkaRepublishInfo,
} from '../RepublishToKafkaModal';
import RepublishToMysqlModal from '../RepublishToMysqlModal';

type Props = {
  ruleId: string;
  target: Target;
  deviceTemplateId?: string;
  refetchData: () => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function RepublishInfoCard({
  ruleId,
  target,
  deviceTemplateId,
  refetchData,
  styles,
}: Props) {
  const imgType = {
    kafka: kafkaImg,
    mysql: mysqlImg,
    clickhouse: clickHouseImg,
  };
  const image = imgType[target.sink_type] as string;
  const [publishType, setPublishType] = useState('');
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
      <Flex alignItems="center" w="260px">
        <Box width="5px" height="40px" backgroundColor="success.300" />
        <Image
          marginLeft="20px"
          width={target.sink_type === 'mysql' ? '48px' : '95px'}
          src={image}
        />
      </Flex>
      <Text
        flex="1"
        // marginLeft="200px"
        color="grayAlternatives.700"
        fontSize="14px"
        isTruncated
        title={target.value}
      >
        {imgType[target.sink_type] === 'kafka'
          ? `主题 Topic：${target.value}`
          : `数据库地址：${target.host}`}
      </Text>
      <HStack display="none" spacing="20px">
        <PencilFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            const type = target.sink_type;
            setPublishType(type);
            onModalOpen();
          }}
        />
        <TrashFilledIcon
          size={20}
          color="grayAlternatives.300"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            const type = target.sink_type;
            setPublishType(type);
            onAlertOpen();
          }}
        />
      </HStack>
      {publishType === 'kafka' && (
        <RepublishToKafkaModal
          info={{ address: target.host, topic: target.value }}
          isOpen={isModalOpen}
          onClose={onModalClose}
          handleSubmit={handleSubmit}
          isLoading={isEditRuleTargetLoading}
        />
      )}
      {publishType === 'mysql' && (
        <RepublishToMysqlModal
          modalKey="edit"
          isOpen={isModalOpen}
          republishType={0}
          ruleId={ruleId || ''}
          deviceTemplateId={deviceTemplateId ?? ''}
          publishedInfo={{
            targetId: target?.id,
            fields: target?.fields,
            address: target?.host,
            name: target?.database,
            mapping: target?.table_name,
          }}
          refetchData={refetchData}
          onClose={onModalClose}
        />
      )}
      {publishType === 'clickhouse' && (
        <RepublishToMysqlModal
          modalKey="edit"
          isOpen={isModalOpen}
          republishType={1}
          ruleId={ruleId || ''}
          deviceTemplateId={deviceTemplateId ?? ''}
          publishedInfo={{
            targetId: target?.id,
            fields: target?.fields,
            address: target?.host,
            name: target?.database,
            mapping: target?.table_name,
          }}
          refetchData={refetchData}
          onClose={onModalClose}
        />
      )}
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
