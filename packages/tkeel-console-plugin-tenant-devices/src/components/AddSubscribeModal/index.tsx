import { HStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { DeprecatedSelect, Modal } from '@tkeel/console-components';

import useListSubscribeQuery, {
  Data,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useListSubscribeQuery';

export interface FormValues {
  subscribe_ids: string[];
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

const renderLabel = (item: Data) => {
  return (
    <HStack>
      <Text fontWeight={800}>{item.title}</Text>: <Text>{item.endpoint}</Text>
    </HStack>
  );
};

const handleSubscribeOptions = (
  subscribed: AddrList[],
  allSubscribe: Data[]
) => {
  return allSubscribe.map((r) => {
    const arr = subscribed.find((v) => r.id === v.id);
    const obj = {
      value: r.id,
      label: renderLabel(r),
      displayLabel: r.title,
    };
    if (arr) return { disabled: true, ...obj };
    return { disabled: false, ...obj };
  });
};

function AddSubscribeModal({
  isOpen,
  onClose,
  addrList = [],
  isConfirmButtonLoading,
  onConfirm,
}: Props) {
  const { isSuccess, subscribeList } = useListSubscribeQuery({
    pageNum: 1,
    pageSize: 20,
    keyWords: '',
  });
  const selectOptions = handleSubscribeOptions(addrList, subscribeList);
  const isSelectDisabled = addrList.length === subscribeList.length;
  const { setValue, trigger, getValues, control } = useForm<FormValues>();
  useEffect(() => {
    setValue(
      'subscribe_ids',
      addrList.map((item) => {
        return item.id;
      })
    );
  }, [addrList, setValue]);

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
        render={({ field: { onChange } }) => (
          <DeprecatedSelect
            style={{ width: '100%' }}
            mode="multiple"
            showArrow
            value={getValues('subscribe_ids')}
            dropdownStyle={{ boxShadow: 'none' }}
            options={selectOptions}
            onChange={onChange}
            loading={!isSuccess}
            // value={value}
            showSearch={false}
            optionLabelProp="displayLabel"
          />
        )}
      />
    </Modal>
  );
}

export default AddSubscribeModal;
