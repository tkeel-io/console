import type { ButtonProps } from '@chakra-ui/react';
import { Box, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import Ajv from 'ajv';
import localizeZh from 'ajv-i18n/localize/zh';
import { useState } from 'react';
import type { FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import {
  Alert,
  Empty,
  Form as BaseForm,
  IconButton,
} from '@tkeel/console-components';
import {
  CloseCircleTwoToneIcon,
  FloppyDiskTwoToneIcon,
  PencilTwoToneIcon,
  RestartTwoToneIcon,
} from '@tkeel/console-icons';

import useProfileDataMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useProfileDataMutation';
import type {
  Data,
  Properties,
  Schema,
} from '@/tkeel-console-plugin-admin-tenants/types/usage-config';

import type { Props as InputProps } from './Input';
import Input from './Input';

const buttonProps: ButtonProps = {
  backgroundColor: 'gray.50',
  color: 'gray.800',
  lineHeight: '20px',
  fontWeight: '400',
  colorScheme: 'gray',
  variant: 'outline',
};

interface Props {
  schema: Schema;
  data?: Data;
  refetchData: () => void;
}

export default function Form({ schema, data, refetchData }: Props) {
  const { tenantId = '' } = useParams();
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useProfileDataMutation({
    params: {
      tenant_id: tenantId,
    },
    onSuccess() {
      refetchData();
      setCurrentMode('view');
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: (values) => {
      const ajv = new Ajv({ allErrors: true, messages: true });
      const validate = ajv.compile(schema);
      const valid = validate(values);

      if (!valid) {
        const { errors: ajvErrors } = validate;

        localizeZh(ajvErrors);

        // eslint-disable-next-line unicorn/no-array-reduce
        const formErrors = (ajvErrors ?? []).reduce<Record<string, FieldError>>(
          (prev, ajvError) => {
            const { instancePath, keyword, message } = ajvError;
            const key = instancePath.slice(1);

            return {
              ...prev,
              [key]: { type: keyword, message },
            };
          },
          {}
        );

        return {
          values: {},
          errors: formErrors,
        };
      }

      return {
        values,
        errors: {},
      };
    },
  });

  const properties = schema?.properties as Properties;
  const fields: Omit<InputProps, 'registerReturn'>[] = Object.entries(
    properties
  ).map(([key, property]) => {
    const { title, description, type } = property;

    let field: Omit<InputProps, 'registerReturn'> = {
      id: key,
      title,
      type: type === 'number' ? 'number' : 'text',
      isDisabled: currentMode === 'view',
    };

    if (description) {
      field = { ...field, description };
    }

    if (errors[key]) {
      field = { ...field, error: errors[key] };
    }

    return field;
  });

  const onSubmit = (formValues: Data) => {
    mutate({ data: { profiles: formValues } });
  };

  const handleResetDefaultValues = () => {
    const defaultValues: Data = {};
    Object.entries(properties).forEach(([key, property]) => {
      const { default: defaultValue } = property;
      if (defaultValue) {
        defaultValues[key] = defaultValue;
      }
      onSubmit(defaultValues);
    });
  };

  const handleReset = () => {
    reset(data);
    setCurrentMode('view');
  };

  return (
    <>
      <BaseForm
        display="flex"
        flexDirection="column"
        height="100%"
        padding="12px 0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="12px"
        >
          <Text
            paddingRight="24px"
            fontSize="14px"
            fontWeight="600"
            lineHeight="32px"
            color="gray.800"
          >
            用量配置
          </Text>
          <HStack alignItems="center" spacing="12px">
            {currentMode === 'view' && (
              <>
                <IconButton
                  {...buttonProps}
                  icon={<PencilTwoToneIcon size="16px" />}
                  onClick={() => setCurrentMode('edit')}
                >
                  编辑
                </IconButton>
                <IconButton
                  {...buttonProps}
                  icon={<RestartTwoToneIcon size="16px" />}
                  isLoading={isLoading}
                  onClick={onOpen}
                >
                  恢复默认配置
                </IconButton>
              </>
            )}
            {currentMode === 'edit' && (
              <>
                <IconButton
                  {...buttonProps}
                  type="submit"
                  isLoading={isLoading}
                  icon={<FloppyDiskTwoToneIcon size="16px" />}
                >
                  保存
                </IconButton>
                <IconButton
                  {...buttonProps}
                  type="reset"
                  icon={<CloseCircleTwoToneIcon size="16px" />}
                  onClick={handleReset}
                >
                  取消
                </IconButton>
              </>
            )}
          </HStack>
        </Flex>
        <Box overflowY="auto" flex="1">
          {fields.length > 0 ? (
            <Flex flexWrap="wrap">
              {fields.map((field) => {
                const { id, type } = field;

                return (
                  <Box
                    key={id}
                    marginBottom="20px"
                    width="calc(50% - 10px)"
                    _odd={{ marginRight: '20px' }}
                  >
                    <Input
                      {...field}
                      registerReturn={register(id, {
                        valueAsNumber: type === 'number',
                      })}
                    />
                  </Box>
                );
              })}
            </Flex>
          ) : (
            <Empty isFullHeight />
          )}
        </Box>
      </BaseForm>
      <Alert
        iconPosition="left"
        icon="warning"
        isOpen={isOpen}
        title="确定要「恢复默认配置」吗？"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleResetDefaultValues}
      />
    </>
  );
}
