import { Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  data?: { id: string; name: string }[];
  onConfirm: (targetId: number) => unknown;
};

export default function MoveRoutingRuleModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  data,
  onConfirm,
}: Props) {
  const [targetId, setTargetId] = useState<number>();

  const params = useParams();
  const { id } = params;

  const handleConfirm = async () => {
    onConfirm(targetId as number);
  };

  return (
    <Modal
      title="移动订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <Select
        defaultValue={id || ''}
        onChange={(el) => {
          setTargetId(Number(el.target.value));
        }}
      >
        {data?.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </Select>
    </Modal>
  );
}
