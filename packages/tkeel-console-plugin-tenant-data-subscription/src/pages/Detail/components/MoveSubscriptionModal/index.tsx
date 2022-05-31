import { useState } from 'react';

import { DeprecatedSelect, Modal } from '@tkeel/console-components';
import { SubscribeInfo } from '@tkeel/console-request-hooks';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  subscribeList: SubscribeInfo[];
  onConfirm: (targetId: number) => unknown;
};

export default function ModifySubscriptionModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  subscribeList,
  onConfirm,
}: Props) {
  const defaultTargetId = subscribeList[0]?.id || '';
  const [targetId, setTargetId] = useState(defaultTargetId);
  const options = subscribeList?.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return (
    <Modal
      title="移动订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={() => {
        if (targetId && !Number.isNaN(Number(targetId))) {
          onConfirm(Number(targetId));
        }
      }}
    >
      <DeprecatedSelect
        defaultValue={defaultTargetId}
        onChange={(value) => setTargetId(value as string)}
        options={options}
        styles={{ select: 'width: 100%;' }}
      />
    </Modal>
  );
}
