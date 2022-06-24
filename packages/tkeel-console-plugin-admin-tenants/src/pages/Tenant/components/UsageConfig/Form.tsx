/* import type { ButtonProps } from '@chakra-ui/react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { ajvResolver } from '@hookform/resolvers/ajv';
import Ajv from 'ajv';
import localizeZh from 'ajv-i18n/localize/zh';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Empty, Form as BaseForm, IconButton } from '@tkeel/console-components';
import {
  CloseCircleTwoToneIcon,
  FloppyDiskTwoToneIcon,
  PencilTwoToneIcon,
  RestartTwoToneIcon,
} from '@tkeel/console-icons';

import type {
  Data,
  Schema,
} from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';

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

const ajv = new Ajv({ allErrors: true, messages: true });

interface Props {
  schema: Schema;
  data: Data;
}

export default function Form({ schema, data }: Props) {
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');

  let propertyList: InputProps[] = [];
  propertyList = Object.entries<Omit<InputProps, 'id'>>(schema.properties).map(
    ([id, rest]) => ({
      id,
      ...rest,
    })
  );

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: ajvResolver(schema),
  });

  const validate = ajv.compile(schema);

  const valid = validate(data);
  if (!valid) {
    localizeZh(validate.errors);
    console.log(validate.errors);
  }

  return (
    <BaseForm
      display="flex"
      flexDirection="column"
      height="100%"
      padding="12px 0"
      onSubmit={handleSubmit((d) => console.log(d))}
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
              >
                恢复默认配置
              </IconButton>
            </>
          )}
          {currentMode === 'edit' && (
            <>
              <IconButton
                {...buttonProps}
                icon={<FloppyDiskTwoToneIcon size="16px" />}
              >
                保存
              </IconButton>
              <IconButton
                {...buttonProps}
                icon={<CloseCircleTwoToneIcon size="16px" />}
                onClick={() => setCurrentMode('view')}
              >
                取消
              </IconButton>
            </>
          )}
        </HStack>
      </Flex>
      <Box overflowY="auto" flex="1">
        {propertyList.length > 0 ? (
          propertyList.map(({ id, type, defaultValue }) => (
            <Input
              key={id}
              id={id}
              type={type}
              defaultValue={defaultValue}
              registerReturn={register(id)}
            />
          ))
        ) : (
          <Empty isFullHeight />
        )}
      </Box>
    </BaseForm>
  );
} */

import type {
  Data,
  Schema,
} from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';

interface Props {
  schema: Schema;
  data: Data;
}

export default function Form({ schema, data }: Props) {
  return (
    <div>
      <p>{JSON.stringify(schema)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
