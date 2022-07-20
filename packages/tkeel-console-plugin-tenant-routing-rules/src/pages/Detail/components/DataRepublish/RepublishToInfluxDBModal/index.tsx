import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal, TextButton, Tip } from '@tkeel/console-components';
import { InfluxdbFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

import TagsForm from '../TagsForm';

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

export default function RepublishToInfluxDBModal({
  info,
  isOpen,
  isLoading,
  onClose,
}: Props) {
  const [validated, setValidated] = useState(true);

  const formHandler = useForm<FormValues>({
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    control,
  } = formHandler;

  const fieldArrayReturn = useFieldArray({
    control,
    name: 'tags',
  });

  const { fields, append } = fieldArrayReturn;

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

  const formFields = ['org', 'bucket', 'url', 'token'];
  const addTagButtonDisabled = fields.length >= 5;

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
      {formFields.map((field) => (
        <TextField
          key={field}
          id={field}
          label={field}
          error={errors[field] as FieldError}
          defaultValue={(info?.[field] as string) ?? ''}
          registerReturn={register(field as keyof FormValues, {
            required: { value: true, message: `请输入 ${field}` },
          })}
          formControlStyle={{ marginTop: '20px' }}
        />
      ))}
      <Button
        colorScheme="brand"
        isLoading={isVerifying}
        onClick={handleVerify}
      >
        验证
      </Button>
      <Flex marginTop="20px" justifyContent="space-between" alignItems="center">
        <Text color="gray.800" fontSize="14px" fontWeight="500">
          自定义标签
        </Text>
        <TextButton
          showIcon
          showTooltip
          tooltipLabel="自定义标签最多限制 5 个"
          onClick={() => {
            if (!addTagButtonDisabled) {
              append({ label: '请输入自定义标签字符串', value: '' });
            }
          }}
          sx={{ marginBottom: '8px' }}
        >
          添加标签
        </TextButton>
      </Flex>
      <Tip
        title="用户自定义标签仅支持输入字符串"
        sx={{ marginBottom: '20px' }}
      />
      <TagsForm<FormValues>
        formHandler={formHandler}
        fieldArrayReturn={fieldArrayReturn}
      />
    </Modal>
  );
}
