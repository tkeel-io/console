import { Flex, StyleProps, Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AutoFilledIcon, MessageWarningFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAddErrorActionMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useAddErrorActionMutation';
import useErrorActionQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useErrorActionQuery';

import ProductTab from '../ProductTab';
import TitleWrapper from '../TitleWrapper';
import ErrorActionInfoCard from './ErrorActionInfoCard';
import ErrorActionModal from './ErrorActionModal';

type Props = {
  subscribeId: number;
  refetchDetail: () => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function ErrorAction({
  subscribeId,
  refetchDetail,
  styles,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconColor = 'grayAlternatives.300';
  const { id } = useParams();
  const toast = plugin.getPortalToast();

  const { errorAction } = useErrorActionQuery(subscribeId);

  const { mutate, isLoading } = useAddErrorActionMutation({
    ruleId: id || '',
    onSuccess() {
      onClose();
      toast('添加错误操作成功', { status: 'success' });
      refetchDetail();
    },
  });

  const handleSubmit = (addSubscribeId: string) => {
    mutate({
      data: {
        subscribe_id: addSubscribeId,
      },
    });
  };

  return (
    <Flex flexDirection="column" {...styles?.wrapper}>
      <TitleWrapper
        icon={<AutoFilledIcon color={iconColor} size="20px" />}
        title="错误操作（可选）"
        description="当转发失败之后，对于数据的存储以及操作"
      />
      <Flex
        marginTop="20px"
        flexDirection="column"
        padding="20px"
        borderRadius="4px"
        backgroundColor="gray.100"
      >
        <Text color="grayAlternatives.500" fontSize="14px" lineHeight="24px">
          请添加相关产品转发数据
        </Text>
        <ProductTab
          name="发送至订阅"
          icon={<MessageWarningFilledIcon size={24} color={iconColor} />}
          onClick={onOpen}
          styles={{
            wrapper: {
              marginTop: '8px',
              paddingLeft: '20px',
              justifyContent: 'flex-start',
            },
          }}
        />
        {!!subscribeId && errorAction && (
          <ErrorActionInfoCard
            ruleId={id || ''}
            errorAction={errorAction}
            refetchDetail={() => refetchDetail()}
            styles={{ wrapper: { marginTop: '20px' } }}
          />
        )}
      </Flex>
      <ErrorActionModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
      />
    </Flex>
  );
}
