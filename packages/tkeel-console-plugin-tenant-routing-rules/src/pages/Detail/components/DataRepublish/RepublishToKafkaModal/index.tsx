import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { KafkaFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface FormValues {
  address: string;
  topic: string;
}

type Props = {
  info?: FormValues;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => unknown;
  handleSubmit: (values: FormValues) => unknown;
};

export default function RepublishToKafkaModal({
  info,
  isOpen,
  isLoading,
  onClose,
  handleSubmit,
}: Props) {
  const [validated, setValidated] = useState(!!info?.address);
  const {
    register,
    formState: { errors },
    setError,
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleSetAddressError = () => {
    setError('address', {
      type: 'manual',
      message: '请输入合法的数据库（集群）地址',
    });
  };

  const toast = plugin.getPortalToast();
  const { mutate, isLoading: isVerifyKafkaLoading } = useVerifyKafkaMutation({
    onSuccess() {
      toast('验证成功', { status: 'success' });
      setValidated(true);
    },
    onError() {
      toast('验证失败', { status: 'error' });
      setValidated(false);
      handleSetAddressError();
    },
  });

  const handleVerifyAddress = async () => {
    const result = await trigger('address');
    if (result) {
      const address = getValues('address');
      mutate({
        params: {
          host: address,
        },
      });
    } else {
      handleSetAddressError();
    }
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (!result) return;
    if (validated) {
      const formValues = getValues();
      handleSubmit(formValues);
    } else {
      setError('address', {
        type: 'manual',
        message: '请验证数据库（集群）地址',
      });
    }
  };

  return (
    <Modal
      height="507px"
      title="转发到 Kafka"
      isOpen={isOpen}
      isConfirmButtonLoading={isLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<KafkaFilledIcon size={24} />}
        title="将数据发送到 Kafka"
      />
      <TextField
        id="address"
        label="数据库（集群）地址"
        error={errors.address}
        defaultValue={info?.address ?? ''}
        registerReturn={register('address', {
          required: { value: true, message: '请输入数据库（集群）地址' },
          onChange() {
            setValidated(false);
          },
        })}
        formControlStyle={{ margin: '20px 0' }}
      />
      <Button
        colorScheme="primary"
        isLoading={isVerifyKafkaLoading}
        onClick={handleVerifyAddress}
      >
        验证
      </Button>
      <TextField
        id="topic"
        label="主题 Topic"
        error={errors.topic}
        defaultValue={info?.topic ?? ''}
        registerReturn={register('topic', {
          required: { value: true, message: '请输入 Topic' },
        })}
        formControlStyle={{ marginTop: '40px' }}
      />
    </Modal>
  );
}
