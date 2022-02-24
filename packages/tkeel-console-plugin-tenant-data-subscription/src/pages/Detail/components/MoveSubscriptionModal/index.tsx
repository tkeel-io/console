import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Select } from '@chakra-ui/react';
import { Modal } from '@tkeel/console-components';

import { Data } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  data?: Data[];
  onConfirm: (targetId: number) => unknown;
};

export default function ModifySubscriptionModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  data,
  onConfirm,
}: Props) {
  const [targetId, setTargetId] = useState<number>();

  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];

  const handleConfirm = async () => {
    // const result = await trigger();
    // if (result) {
    //   onConfirm(formValues);
    onConfirm(targetId as number);
    //   reset();
    // }
  };

  return (
    <Modal
      title="移动订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        // reset();

        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <Select
        defaultValue={ID}
        onChange={(el) => {
          setTargetId(Number(el.target.value));
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
