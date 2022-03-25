import { Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { KafkaFilledIcon } from '@tkeel/console-icons';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface FormValues {
  address: string;
  topic: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

const handleSubmit: SubmitHandler<FormValues> = (values) => {
  // eslint-disable-next-line no-console
  console.log('RepublishToKafkaModal ~ values', values);
};

export default function RepublishToKafkaModal({ isOpen, onClose }: Props) {
  const {
    register,
    formState: { errors },
    setError,
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleValidateAddress = () => {
    setError('address', {
      type: 'manual',
      message: '验证失败',
    });
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      handleSubmit(formValues);
    }
  };

  return (
    <Modal
      height="507px"
      title="转发到 Kafka"
      isOpen={isOpen}
      // isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<KafkaFilledIcon />}
        title="将数据发送到 Kafka"
      />
      <TextField
        id="address"
        label="数据库（集群）地址"
        error={errors.address}
        registerReturn={register('address', {
          required: { value: true, message: '请输入数据库（集群）地址' },
        })}
        formControlStyle={{ margin: '20px 0' }}
      />
      <Button colorScheme="primary" onClick={handleValidateAddress}>
        验证
      </Button>
      <TextField
        id="topic"
        label="主题 Topic"
        error={errors.topic}
        registerReturn={register('topic', {
          required: { value: true, message: '请输入 Topic' },
        })}
        formControlStyle={{ marginTop: '40px' }}
      />
    </Modal>
  );
}
