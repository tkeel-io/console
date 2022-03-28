import { SubmitHandler, useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { MessageWarningFilledIcon } from '@tkeel/console-icons';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { SelectField } = FormField;

export interface FormValues {
  address: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

const handleSubmit: SubmitHandler<FormValues> = (values) => {
  // eslint-disable-next-line no-console
  console.log('ErrorActionModal ~ values', values);
};

export default function ErrorActionModal({ isOpen, onClose }: Props) {
  const {
    // register,
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      handleSubmit(formValues);
    }
  };

  return (
    <Modal
      height="343px"
      title="错误操作至订阅"
      isOpen={isOpen}
      // isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<MessageWarningFilledIcon size={24} />}
        title="将数据发送到订阅"
      />
      <SelectField<FormValues>
        id="address"
        name="address"
        label="订阅地址"
        options={[
          {
            value: 'amqp://host:port/<virtual_host>',
            label: '我的订阅：amqp://host:port/<virtual_host>',
          },
          {
            value: 'amqp://host:port/idc',
            label: 'IDC设备分组订阅：amqp://host:port/idc',
          },
        ]}
        error={errors.address}
        rules={{
          required: { value: true, message: '请输入订阅地址' },
        }}
        control={control}
        formControlStyle={{ marginTop: '20px' }}
      />
    </Modal>
  );
}
