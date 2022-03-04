import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Modal, Select } from '@tkeel/console-components';

import useListSubscribeQuery, {
  Data,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useListSubscribeQuery';

export interface FormValues {
  subscribe_ids: number[];
}

export interface AddrList {
  id: string;
  title: string;
  addr: string;
}

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  addrList: AddrList[];
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => void;
};

const handleSubscribeOptions = (
  subscribed: AddrList[],
  allSubscribe: Data[]
) => {
  return allSubscribe.map((r) => {
    const arr = subscribed.find((v) => r.id === v.id);
    const obj = { value: Number(r.id), label: r.description };
    if (arr) return { disabled: true, ...obj };
    return { disabled: false, ...obj };
  });
};

function AddSubscribeModal({
  isOpen,
  onClose,
  addrList,
  isConfirmButtonLoading,
  onConfirm,
}: Props) {
  const { isSuccess, subscribeList } = useListSubscribeQuery({
    pageNum: 1,
    pageSize: 20,
    keyWords: '',
  });
  const selectOptions = handleSubscribeOptions(addrList ?? [], subscribeList);
  const isSelectDisabled = addrList.length === subscribeList.length;
  const defaultSelectValue = selectOptions.find((r) => !r.disabled);
  const { setValue, trigger, getValues, control } = useForm<FormValues>();
  useEffect(() => {
    setValue(
      'subscribe_ids',
      defaultSelectValue ? [defaultSelectValue.value] : []
    );
  }, [selectOptions, setValue, defaultSelectValue]);

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
      isConfirmButtonDisabled={isSelectDisabled}
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
        render={({ field: { value } }) => (
          <Select
            style={{ width: '100%' }}
            mode="multiple"
            disabled={isSelectDisabled}
            showArrow
            allowClear
            dropdownStyle={{ boxShadow: 'none' }}
            options={selectOptions}
            loading={!isSuccess}
            value={value}
          />
        )}
      />
    </Modal>
  );
}

export default AddSubscribeModal;
