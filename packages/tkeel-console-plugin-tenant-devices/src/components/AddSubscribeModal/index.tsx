import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Modal, Select } from '@tkeel/console-components';

import useListSubscribeQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useListSubscribeQuery';

export interface FormValues {
  subscribe_ids: number[];
}

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => void;
};

function AddSubscribeModal({
  isOpen,
  onClose,
  isConfirmButtonLoading,
  onConfirm,
}: Props) {
  const { isSuccess, subscribeList } = useListSubscribeQuery({
    pageNum: 1,
    pageSize: 20,
    keyWords: '',
  });
  const options = subscribeList.map((r) => {
    return {
      label: r.description,
      value: Number.parseInt(r.id, 10),
    };
  });
  const { setValue, trigger, getValues, control } = useForm<FormValues>();
  useEffect(() => {
    setValue('subscribe_ids', options[0]?.value ? [options[0]?.value] : []);
  }, [options, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    onConfirm(values);
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSubmit(values);
    }
  };

  return (
    <Modal
      title="订阅设备"
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={handleConfirm}
      modalBodyStyle={{ padding: '20px 40px 40px' }}
      width="600px"
      footer={null}
    >
      <Text fontSize="14px" lineHeight="24px" mb="8px">
        订阅地址
      </Text>
      <Controller
        name="subscribe_ids"
        control={control}
        rules={{ required: { value: true, message: '请选择订阅通道' } }}
        render={({ field: { onChange, value } }) => (
          <Select
            style={{ width: '100%' }}
            mode="multiple"
            showArrow
            allowClear
            options={options}
            loading={!isSuccess}
            onChange={onChange}
            value={value}
          />
        )}
      />
    </Modal>
  );
}

export default AddSubscribeModal;
