import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal, Tip } from '@tkeel/console-components';
import { AddFilledIcon, InfluxdbFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface FormValues {
  org: string;
  bucket: string;
  url: string;
  token: string;
  tags: {
    label: string;
    value: string;
  }[];
}

type Props = {
  info?: FormValues;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => unknown;
};

export default function RepublishToInfluxdbModal({
  info,
  isOpen,
  isLoading,
  onClose,
}: Props) {
  const [validated, setValidated] = useState(!!info?.org);
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    control,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'tags',
  });

  const toast = plugin.getPortalToast();
  const { isLoading: isVerifying } = useVerifyKafkaMutation({
    onSuccess() {
      toast('验证成功', { status: 'success' });
      setValidated(true);
    },
    onError() {
      toast('验证失败', { status: 'error' });
      setValidated(false);
    },
  });

  const handleVerify = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      // eslint-disable-next-line no-console
      console.log('handleVerify ~ values', values);
    }
  };

  const handleSubmit = (formValues: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('handleSubmit ~ formValues', formValues);
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (!result) return;
    if (validated) {
      const formValues = getValues();
      handleSubmit(formValues);
    }
  };

  return (
    <Modal
      title="转发到 InfluxDB"
      isOpen={isOpen}
      isConfirmButtonLoading={isLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<InfluxdbFilledIcon size={24} />}
        title="将数据发送到 InfluxDB"
      />
      <TextField
        id="org"
        label="org"
        error={errors.org}
        defaultValue={info?.org ?? ''}
        registerReturn={register('org', {
          required: { value: true, message: '请输入 org' },
        })}
        formControlStyle={{ marginTop: '20px' }}
      />
      <TextField
        id="bucket"
        label="bucket"
        error={errors.bucket}
        defaultValue={info?.bucket ?? ''}
        registerReturn={register('bucket', {
          required: { value: true, message: '请输入 bucket' },
        })}
      />
      <TextField
        id="url"
        label="url"
        error={errors.url}
        defaultValue={info?.url ?? ''}
        registerReturn={register('url', {
          required: { value: true, message: '请输入 url' },
        })}
      />
      <TextField
        id="token"
        label="token"
        error={errors.token}
        defaultValue={info?.token ?? ''}
        registerReturn={register('token', {
          required: { value: true, message: '请输入 token' },
        })}
      />
      <Button
        colorScheme="brand"
        isLoading={isVerifying}
        onClick={handleVerify}
      >
        验证
      </Button>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="gray.400" fontSize="14px" fontWeight="500">
          自定义标签
        </Text>
        <Flex alignItems="center">
          <AddFilledIcon />
          <Text
            color="grayAlternatives/300"
            onClick={() =>
              append({ label: '请输入自定义标签字符串', value: '' })
            }
          >
            添加标签
          </Text>
        </Flex>
      </Flex>
      <Tip title="用户自定义标签仅支持输入字符串" />
      {fields.map((_, i) => {
        return (
          <Flex key={String(i + 1)}>
            <Flex alignItems="center">
              <TextField id={`tags.${i}.label`} readOnly={false} />
            </Flex>
          </Flex>
        );
      })}
    </Modal>
  );
}
