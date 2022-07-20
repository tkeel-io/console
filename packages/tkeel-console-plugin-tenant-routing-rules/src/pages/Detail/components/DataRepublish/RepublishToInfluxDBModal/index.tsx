import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormField, Modal, TextButton, Tip } from '@tkeel/console-components';
// import { InfluxdbFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useCreateRuleTargetMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRuleTargetMutation';
import useVerifyInfluxDBMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyInfluxDBMutation';
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
  targetId?: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  refetchData: () => void;
};

export default function RepublishToInfluxDBModal({
  info,
  targetId,
  isOpen,
  isLoading,
  onClose,
  refetchData,
}: Props) {
  const [validated, setValidated] = useState(!!info);
  const [isShowVerifyErrorTip, setIsShowVerifyErrorTip] = useState(false);
  const [sinkId, setSinkId] = useState('');

  const formHandler = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      org: info?.org ?? '',
      bucket: info?.bucket ?? '',
      url: info?.url ?? '',
      tags: info?.tags ?? [],
    },
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
  const { mutate: verifyInfluxDBMutate, isLoading: isVerifying } =
    useVerifyInfluxDBMutation({
      onSuccess(data) {
        toast('验证成功', { status: 'success' });
        setValidated(true);
        setSinkId(data.data.id);
        setIsShowVerifyErrorTip(false);
      },
      onError() {
        toast('验证失败', { status: 'error' });
        setValidated(false);
      },
    });

  const handleVerify = async () => {
    const result = await trigger();
    if (result) {
      const { url, org, bucket, token } = getValues();
      verifyInfluxDBMutate({
        data: {
          urls: url,
          meta: {
            org,
            bucket,
            token,
          },
        },
      });
    }
  };

  const { id } = useParams();
  const { mutate: createRuleTargetMutate } = useCreateRuleTargetMutation<{
    sink_type: string;
    sink_id: string;
    tags: Record<string, string>;
  }>({
    ruleId: id || '',
    onSuccess() {
      toast('添加转发成功', { status: 'success' });
      onClose();
      refetchData();
    },
  });

  const { mutate: editRuleTargetMutate } = useCreateRuleTargetMutation<{
    tags: Record<string, string>;
  }>({
    method: 'PUT',
    ruleId: id || '',
    targetId: targetId || '',
    onSuccess() {
      toast('编辑转发成功', { status: 'success' });
      onClose();
      refetchData();
    },
  });

  const handleSubmit = () => {
    const formValues = getValues();

    const { tags } = formValues;
    const tagsObject = {};
    tags.forEach(({ label, value }) => {
      tagsObject[label] = value;
    });

    if (info) {
      editRuleTargetMutate({
        data: {
          tags: tagsObject,
        },
      });
    } else if (sinkId) {
      createRuleTargetMutate({
        data: {
          sink_type: 'influxdb',
          sink_id: sinkId,
          tags: tagsObject,
        },
      });
    }
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (!result) return;
    if (validated) {
      handleSubmit();
    } else {
      setIsShowVerifyErrorTip(true);
    }
  };

  const formFields = ['org', 'bucket', 'url', 'token'];
  if (info) {
    formFields.pop();
  }

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
        // icon={<InfluxdbFilledIcon size={24} />}
        icon=""
        title="将数据发送到 InfluxDB"
      />
      {formFields.map((field) => (
        <TextField
          key={field}
          id={field}
          type={field === 'token' ? 'password' : 'text'}
          isDisabled={!!info}
          autoComplete={field === 'token' ? 'new-password' : 'off'}
          label={field}
          error={errors[field] as FieldError}
          registerReturn={register(field as keyof FormValues, {
            required: { value: true, message: `请输入 ${field}` },
          })}
          formControlStyle={{ marginTop: '20px' }}
        />
      ))}
      {!info && (
        <Flex alignItems="center">
          <Button
            colorScheme="brand"
            isLoading={isVerifying}
            onClick={handleVerify}
          >
            验证
          </Button>
          {isShowVerifyErrorTip && (
            <Text marginLeft="20px" color="red.500" fontSize="14px">
              请先验证完成，再进行确认保存
            </Text>
          )}
        </Flex>
      )}
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
