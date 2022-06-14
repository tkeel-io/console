import { Box, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox, FormField } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import ContentHeader from '@/tkeel-console-plugin-admin-notification-configs/components/ContentHeader';
import useOperateMailConfigMutation from '@/tkeel-console-plugin-admin-notification-configs/hooks/mutations/useOperateMailConfigMutation';
import useMailConfigQuery from '@/tkeel-console-plugin-admin-notification-configs/hooks/queries/useMailConfigQuery';
import { MailFormField } from '@/tkeel-console-plugin-admin-notification-configs/types';

const { TextField } = FormField;

interface Props {
  defaultValues?: MailFormField;
}

const DEFAULT_VALUES = {
  smtpAddress: '',
  port: '',
  ssl: 0,
  smtpUserName: '',
  smtpPassWord: '',
  fromAddress: '',
};

export default function Email({ defaultValues = DEFAULT_VALUES }: Props) {
  const {
    register,
    getValues,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<MailFormField>({
    defaultValues,
  });

  const EmailReg =
    /^[\da-z]+([.\\_-]*[\da-z])*@([\da-z]+[\da-z-]*[\da-z]+.){1,63}[\da-z]+$/;

  const watchAllFields = watch();
  const toast = plugin.getPortalToast();

  const [btnDisable, setBtnDisable] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [preValues, setPreValues] = useState(defaultValues);

  const { data } = useMailConfigQuery();

  const { isLoading, mutate } = useOperateMailConfigMutation({
    onSuccess() {
      setBtnDisable(true);
      if (isEdit) {
        toast.success('修改成功');
      } else {
        toast.success('创建成功');
      }
    },
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      if (!values.id) {
        delete values.id;
      }
      mutate({ data: values });
      setPreValues(values);
    }
  };

  useEffect(() => {
    if (JSON.stringify(preValues) !== JSON.stringify(watchAllFields)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [watchAllFields, preValues]);

  useEffect(() => {
    if (data?.id) {
      reset(data);
      setPreValues(data);
      setIsEdit(true);
    }
  }, [data, reset]);

  const inputStyle = {
    width: '520px',
    backgroundColor: 'white',
  };

  return (
    <Box>
      <ContentHeader title="服务器配置" />
      <Box flex="1" overflowY="auto" backgroundColor="gray.50" padding="20px">
        <HStack alignItems="flex-start">
          <Box>
            <TextField
              id="smtpAddress"
              formControlStyle={{ width: '300px' }}
              inputStyle={{ width: '300px', backgroundColor: 'white' }}
              label="SMTP服务器地址"
              error={errors.smtpAddress}
              placeholder="例：192.168.1.10"
              registerReturn={register('smtpAddress', {
                required: { value: true, message: '请填写SMTP服务器地址' },
              })}
            />
          </Box>
          <Box marginInlineStart="20px !important">
            <TextField
              id="port"
              inputStyle={{ width: '200px', backgroundColor: 'white' }}
              label="端口"
              error={errors.port}
              placeholder="例：25"
              registerReturn={register('port', {
                required: { value: true, message: '请填写端口' },
                pattern: {
                  value: /^\d+$/,
                  message: '请输入正确的端口',
                },
                onBlur: () => trigger('port'),
              })}
            />
          </Box>
        </HStack>

        <Box marginBottom="16px">
          <Checkbox
            name="ssl"
            isChecked={!!getValues('ssl')}
            onChange={(e) => {
              setValue('ssl', Number(e.target.checked));
            }}
          >
            使用SSL安全连接
          </Checkbox>
        </Box>

        <Box>
          <TextField
            id="smtpUserName"
            inputStyle={inputStyle}
            label="SMTP用户"
            error={errors.smtpUserName}
            placeholder="例：admin@example.com"
            registerReturn={register('smtpUserName', {
              required: { value: true, message: '请填写SMTP用户' },
            })}
          />
        </Box>

        <Box>
          <TextField
            id="smtpPassWord"
            formControlStyle={{ width: '520px' }}
            inputStyle={inputStyle}
            label="SMTP密码"
            type="password"
            error={errors.smtpPassWord}
            placeholder="请输入密码"
            registerReturn={register('smtpPassWord', {
              required: { value: true, message: '请填写密码' },
              onBlur: () => trigger('smtpPassWord'),
            })}
          />
        </Box>

        <Box>
          <TextField
            id="fromAddress"
            inputStyle={inputStyle}
            label="发件人邮箱"
            error={errors.fromAddress}
            placeholder="例：admin@example.com"
            registerReturn={register('fromAddress', {
              required: { value: true, message: '请填写发件人邮箱' },
              pattern: {
                value: EmailReg,
                message: '请输入正确发件人邮箱',
              },
              onBlur: () => trigger('fromAddress'),
            })}
          />
        </Box>

        <HStack>
          <Button
            boxShadow="none"
            borderRadius="4px"
            colorScheme="brand"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={btnDisable}
          >
            保存
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
