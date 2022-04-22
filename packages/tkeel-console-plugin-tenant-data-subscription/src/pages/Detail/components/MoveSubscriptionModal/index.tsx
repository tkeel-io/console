import { Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '@tkeel/console-components';
import { SubscribeInfo } from '@tkeel/console-request-hooks';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  data?: SubscribeInfo[];
  onConfirm: (targetId: number) => unknown;
};

export default function ModifySubscriptionModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  data,
  onConfirm,
}: Props) {
  const { id } = useParams();

  const [targetId, setTargetId] = useState(id || '');

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
      <Select
        defaultValue={id || ''}
        onChange={(e) => {
          setTargetId(e.target.value);
        }}
      >
        {data?.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.title}
            </option>
          );
        })}
      </Select>
    </Modal>
  );
}
