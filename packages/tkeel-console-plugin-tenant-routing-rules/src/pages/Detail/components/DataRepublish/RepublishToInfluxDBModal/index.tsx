import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal, Tip, Tooltip } from '@tkeel/console-components';
import { AddFilledIcon, InfluxdbFilledIcon } from '@tkeel/console-icons';
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
      <Flex marginTop="20px" justifyContent="space-between" alignItems="center">
        <Text color="gray.800" fontSize="14px" fontWeight="500">
          自定义标签
        </Text>
        <Tooltip label={addTagButtonDisabled ? '自定义标签最多限制 5 个' : ''}>
          <Flex
            marginBottom="8px"
            alignItems="center"
            cursor={addTagButtonDisabled ? 'not-allowed' : 'pointer'}
            opacity={addTagButtonDisabled ? '.5' : '1'}
            onClick={() => {
              if (!addTagButtonDisabled) {
                append({ label: '请输入自定义标签字符串', value: '' });
              }
            }}
          >
            <AddFilledIcon color="grayAlternatives.300" />
            <Text color="grayAlternatives.300" fontSize="12px">
              添加标签
            </Text>
          </Flex>
        </Tooltip>
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
