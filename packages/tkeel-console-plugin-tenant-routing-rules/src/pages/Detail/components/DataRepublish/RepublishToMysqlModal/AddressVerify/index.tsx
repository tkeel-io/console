import { Box, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField } from '@tkeel/console-components';
import { MySqlFilledIcon } from '@tkeel/console-icons';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface FormValues {
  address: string;
  name: string;
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
      <FormControl
        label="数据库地址"
        id="form-verify"
        formControlStyle={{ mt: '20px' }}
      >
        <Flex border="1px solid" borderColor="gray.200" borderRadius="4px">
          <TextField
            id="address"
            label={false}
            error={errors.address}
            registerReturn={register('address', {
              required: { value: true, message: '请输入数据库地址' },
            })}
            formControlStyle={{ w: '70%', mb: '0' }}
            inputStyle={{ borderWidth: '0px', mb: '0' }}
            formHelperStyle={{ mt: 0 }}
            formLabelStyle={{ mb: 0 }}
          />
          <Box height="" width="1px" bg="gray.200" />
          <TextField
            id="name"
            label={false}
            error={errors.name}
            placeholder="数据库名称"
            registerReturn={register('name', {
              required: { value: true, message: '请输入数据库地址' },
            })}
            formControlStyle={{ w: '30%', mb: '0' }}
            inputStyle={{ borderWidth: '0px', mb: '0' }}
            formHelperStyle={{ mt: 0 }}
            formLabelStyle={{ mb: 0 }}
          />
        </Flex>
        <Flex mt="20px">
          <TextField
            id="userName"
            error={errors.userName}
            placeholder="用户名"
            registerReturn={register('userName', {
              required: { value: true, message: '请输入用户名' },
            })}
            formControlStyle={{ mr: '6px' }}
            formHelperStyle={{ mt: 0 }}
            formLabelStyle={{ mb: 0 }}
          />
          <TextField
            id=" passWord"
            error={errors.passWord}
            placeholder="密码"
            registerReturn={register('passWord', {
              required: { value: true, message: '请输入密码' },
            })}
            formControlStyle={{ ml: '6px' }}
            formHelperStyle={{ mt: 0 }}
            formLabelStyle={{ mb: 0 }}
          />
        </Flex>
      </FormControl>
    </Box>
  );
}
