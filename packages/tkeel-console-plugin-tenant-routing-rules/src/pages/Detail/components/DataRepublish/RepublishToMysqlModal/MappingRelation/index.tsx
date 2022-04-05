import { Box, Flex, Text } from '@chakra-ui/react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

// import { KafkaFilledIcon } from '@tkeel/console-icons';
// import { plugin } from '@tkeel/console-utils';
// import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
// import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';
// const { TextField } = FormField;

const { TextField } = FormField;

export interface FormValues {
  address: string;
  userName: string;
  passWord: string;
}

// type Props = {
//   onClose: () => unknown;
// };

export default function MappingRelation() {
  const {
    register,
    formState: { errors },
    // trigger,
    // getValues,
    // reset,
  } = useForm<FormValues>();
  return (
    <Box>
      <Text
        margin="20px 0"
        height="32px"
        lineHeight="32px"
        paddingLeft="12px"
        border="1px"
        borderColor="success.300"
        color="success.300"
        fontSize="12px"
        fontWeight="500"
        borderRadius="4px"
        backgroundColor="success.50"
      >
        数据库地址验证成功
      </Text>
      <TextField
        id="address"
        label="数据库地址"
        error={errors.address}
        registerReturn={register('address', {
          required: { value: true, message: '请输入数据库地址' },
          // pattern: {
          //   value: /.*:9092$/,
          //   message: '请输入合法的数据库（集群）地址',
          // },
        })}
        formControlStyle={{ margin: '20px 0' }}
      />
      <Flex mb="4px">
        <TextField
          id="userName"
          error={errors.userName}
          registerReturn={register('userName', {
            required: { value: true, message: '请输入用户名' },
          })}
          formControlStyle={{ mr: '6px' }}
        />
        <TextField
          id=" passWord"
          error={errors.passWord}
          registerReturn={register('passWord', {
            required: { value: true, message: '请输入密码' },
          })}
          formControlStyle={{ m: '6px' }}
        />
      </Flex>
    </Box>
  );
}
//
