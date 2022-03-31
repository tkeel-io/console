import { Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { MessageWarningTwoToneIcon } from '@tkeel/console-icons';
import { useSubscribeListQuery } from '@tkeel/console-request-hooks';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { SelectField } = FormField;

export interface FormValues {
  subscribeId: string;
}

type Props = {
  defaultSubscribeId?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => unknown;
  handleSubmit?: (subscribeId: string) => unknown;
};

export default function ErrorActionModal({
  defaultSubscribeId,
  isLoading,
  isOpen,
  onClose,
  handleSubmit,
}: Props) {
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>();

  const { subscribeList } = useSubscribeListQuery();

  const handleConfirm = async () => {
    const result = await trigger('subscribeId');
    if (result) {
      const subscribeId = getValues('subscribeId');
      if (handleSubmit) {
        handleSubmit(subscribeId);
      }
    }
  };

  const options = subscribeList.map((subscribe) => ({
    value: subscribe.id ?? '',
    label: subscribe.title ?? '',
  }));

  let defaultValue = options[0] ? options[0].value : '';
  if (
    defaultSubscribeId &&
    options.some((item) => item.value === defaultSubscribeId)
  ) {
    defaultValue = defaultSubscribeId;
  }

  return (
    <Modal
      title="错误操作至订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<MessageWarningTwoToneIcon size={24} />}
        title="将数据发送到订阅"
      />
      <Text
        margin="20px 0"
        height="32px"
        lineHeight="32px"
        paddingLeft="12px"
        border="1px"
        borderColor="blue.300"
        color="blue.300"
        fontSize="12px"
        fontWeight="500"
        borderRadius="4px"
        backgroundColor="blue.50"
      >
        请注意，错误操作有且只有一条，操作完成后会替换掉原有的地址
      </Text>
      <SelectField<FormValues>
        id="subscribeId"
        name="subscribeId"
        label="订阅地址"
        defaultValue={defaultValue}
        options={options}
        error={errors.subscribeId}
        rules={{
          required: { value: true, message: '订阅地址为空' },
        }}
        control={control}
        formControlStyle={{ marginTop: '20px' }}
      />
    </Modal>
  );
}
