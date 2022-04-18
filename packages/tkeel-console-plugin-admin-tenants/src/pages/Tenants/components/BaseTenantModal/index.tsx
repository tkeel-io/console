import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import { omit } from 'lodash';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import { AuthTypes } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

import AuthTypeRadioGroup from './AuthTypeRadioGroup';

const { TextField, TextareaField } = FormField;

export interface FormFields {
  title?: {
    isHide?: boolean;
    disabled?: boolean;
  };
  auth_type?: {
    isHide?: boolean;
    disabled?: boolean;
  };
  admin?: {
    username?: {
      isHide?: boolean;
      disabled?: boolean;
    };
    password?: {
      isHide?: boolean;
      disabled?: boolean;
    };
    nick_name?: {
      isHide?: boolean;
      disabled?: boolean;
    };
  };
  remark?: {
    isHide?: boolean;
    disabled?: boolean;
  };
}

export interface FormValues {
  title: string;
  auth_type: AuthTypes;
  admin?: {
    username: string;
    password?: string;
    nick_name?: string;
  };
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

export default function BaseTenantModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues = { title: '', auth_type: 'internal' },
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues,
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();

      if (formValues.auth_type === 'external') {
        onConfirm(omit(formValues, 'admin'));
      } else {
        onConfirm(formValues);
      }
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

        <FormControl marginBottom="16px">
          <FormLabel fontSize="14px" lineHeight="24px" color="gray.600">
            认证方式
          </FormLabel>
          <AuthTypeRadioGroup
            onChange={(value) => {
              setValue('auth_type', value);
            }}
          />
        </FormControl>
        {watch('auth_type') === 'internal' && (
          <>
            <TextField
              id="admin"
              label="管理员账号"
              isDisabled={formFields?.admin?.username?.disabled}
              help={schemas.username.help}
              error={errors.admin?.username}
              registerReturn={register(
                'admin.username',
                schemas.username.registerOptions
              )}
            />
            <TextField
              id="nickName"
              label="管理员名称"
              isDisabled={formFields?.admin?.nick_name?.disabled}
              error={errors.admin?.nick_name}
              registerReturn={register('admin.nick_name')}
            />
          </>
        )}
        <TextareaField
          id="remark"
          label="备注"
          isDisabled={formFields?.remark?.disabled}
          error={errors.remark}
          registerReturn={register('remark')}
          inputStyle={{ height: '80px' }}
        />
      </Box>
    </Modal>
  );
}
