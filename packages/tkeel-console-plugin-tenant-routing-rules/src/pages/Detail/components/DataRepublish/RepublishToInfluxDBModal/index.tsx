import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormField, Modal, TextButton, Tip } from '@tkeel/console-components';
import { InfluxDBFilledIcon } from '@tkeel/console-icons';
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
        toast('????????????', { status: 'success' });
        setValidated(true);
        setSinkId(data.data.id);
        setIsShowVerifyErrorTip(false);
      },
      onError() {
        toast('????????????', { status: 'error' });
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
      toast('??????????????????', { status: 'success' });
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
      toast('??????????????????', { status: 'success' });
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
      title="????????? InfluxDB"
      isOpen={isOpen}
      isConfirmButtonLoading={isLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <ModalContentTitle
        icon={<InfluxDBFilledIcon size={24} />}
        title="?????????????????? InfluxDB"
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
            required: { value: true, message: `????????? ${field}` },
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
            ??????
          </Button>
          {isShowVerifyErrorTip && (
            <Text marginLeft="20px" color="red.500" fontSize="14px">
              ??????????????????????????????????????????
            </Text>
          )}
        </Flex>
      )}
      <Flex marginTop="20px" justifyContent="space-between" alignItems="center">
        <Text color="gray.800" fontSize="14px" fontWeight="500">
          ???????????????
        </Text>
        <TextButton
          showIcon
          showTooltip
          tooltipLabel="??????????????????????????? 5 ???"
          onClick={() => {
            if (!addTagButtonDisabled) {
              append({ label: '?????????????????????????????????', value: '' });
            }
          }}
          sx={{ marginBottom: '8px' }}
        >
          ????????????
        </TextButton>
      </Flex>
      <Tip
        title="?????????????????????????????????????????????"
        sx={{ marginBottom: '20px' }}
      />
      <TagsForm<FormValues>
        formHandler={formHandler}
        fieldArrayReturn={fieldArrayReturn}
      />
    </Modal>
  );
}
