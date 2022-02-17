import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react';
import { FormField, Modal } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import AuthTypeOption from './AuthTypeOption';

const { TextField } = FormField;

export interface FormFields {
  title?: {
    isHide?: boolean;
    disabled?: boolean;
  };
  admin?: {
    isHide?: boolean;
    disabled?: boolean;
  };
  nick_name?: {
    isHide?: boolean;
    disabled?: boolean;
  };
  remark?: {
    isHide?: boolean;
    disabled?: boolean;
  };
}

export interface FormValues {
  title: string;
  admin: string;
  nick_name?: string;
  remark?: string;
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

const AUTH_TYPES = [
  {
    title: '平台默认',
    key: 'default',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
  },
  {
    title: '第三方',
    key: 'thirdParty',
    description:
      '用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。',
  },
];

export default function BaseTenantModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>({
    defaultValues,
  });

  const [selectedAuthType, setSelectedAuthType] = useState<string>('default');
  const handleSelectAuth = (key: string) => () => {
    setSelectedAuthType(key);
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Box height="530px" overflowY="scroll">
        <TextField
          id="title"
          label="空间名称"
          isDisabled={formFields?.title?.disabled}
          error={errors.title}
          registerReturn={register(
            'title',
            schemas.tenantTitle.registerOptions
          )}
        />

        <FormControl display="none" marginBottom="16px">
          <FormLabel fontSize="14px" lineHeight="24px" color="gray.600">
            平台选择
          </FormLabel>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {AUTH_TYPES.map((item) => {
              return (
                <GridItem
                  colSpan={1}
                  key={item.key}
                  onClick={handleSelectAuth(item.key)}
                >
                  <AuthTypeOption
                    {...item}
                    isSelected={selectedAuthType === item.key}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </FormControl>

        <TextField
          id="admin"
          label="管理员账号"
          isDisabled={formFields?.admin?.disabled}
          help={schemas.username.help}
          error={errors.admin}
          registerReturn={register('admin', schemas.username.registerOptions)}
        />
        <TextField
          id="nickName"
          label="管理员名称"
          isDisabled={formFields?.nick_name?.disabled}
          error={errors.nick_name}
          registerReturn={register('nick_name')}
        />
        <TextField
          id="remark"
          label="备注"
          isDisabled={formFields?.remark?.disabled}
          error={errors.remark}
          registerReturn={register('remark')}
        />
      </Box>
    </Modal>
  );
}
