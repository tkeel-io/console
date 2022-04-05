import { Box, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import { MySqlFilledIcon } from '@tkeel/console-icons';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface FormValues {
  address: string;
  userName: string;
  passWord: string;
}

// type Props = {
//   onClose: () => unknown;
// };

export default function AddressVerify() {
  const {
    register,
    formState: { errors },
    // trigger,
    // getValues,
    // reset,
  } = useForm<FormValues>();
  return (
    <Box>
      <ModalContentTitle
        icon={<MySqlFilledIcon size={44} />}
        title="将数据发送到 MySQL"
      />
      <TextField
        id="address"
        label="数据库地址"
        error={errors.address}
        registerReturn={register('address', {
          required: { value: true, message: '请输入数据库地址' },
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
          formControlStyle={{ ml: '6px' }}
        />
      </Flex>
    </Box>
  );
}
//
