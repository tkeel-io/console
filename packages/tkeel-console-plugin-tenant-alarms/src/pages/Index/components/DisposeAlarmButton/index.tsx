import { useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import { MoreActionButton, RectangleButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import { useAlarmContext } from '@/tkeel-console-plugin-tenant-alarms/context/alarm';
import useAlarmHandOpinionsMutation from '@/tkeel-console-plugin-tenant-alarms/hooks/mutations/useAlarmHandOpinionsMutation';

import DisposeAlarmModal, { DisposeAlarmModalForm } from '../DisposeAlarmModal';

interface Props {
  alarmId: number;
  type?: 'action' | 'button';
}

function DisposeAlarmButton({ alarmId, type = 'action' }: Props) {
  const toast = plugin.getPortalToast();
  const { refetch } = useAlarmContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useAlarmHandOpinionsMutation({
    onSuccess() {
      toast.success('处理意见填写成功');
      refetch();
      onClose();
    },
  });

  const handleConfirm = (formValues: DisposeAlarmModalForm) => {
    mutate({
      data: {
        alarmId,
        ...formValues,
      },
    });
  };
  let Component = (
    <MoreActionButton
      onClick={onOpen}
      icon={<PencilFilledIcon color="grayAlternatives.300" size="12px" />}
      title="处理告警"
    />
  );

  if (type === 'button') {
    Component = <RectangleButton onClick={onOpen}>处理告警</RectangleButton>;
  }
  return (
    <>
      {Component}
      {isOpen && (
        <DisposeAlarmModal
          isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleConfirm}
        />
      )}
    </>
  );
}

export default memo(DisposeAlarmButton);
