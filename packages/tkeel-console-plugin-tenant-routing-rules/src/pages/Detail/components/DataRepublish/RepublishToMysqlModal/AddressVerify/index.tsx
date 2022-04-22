import { Box, Button, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField } from '@tkeel/console-components';

import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';

const { TextField } = FormField;

export interface AddressFormValues {
  address: string;
  name: string;
  userName: string;
  passWord: string;
}
type FormValues = {
  address: string;
  name: string;
};

type Props = {
  modalKey: string;
  title: string;
  icon: ReactNode;
  defaultValues?: FormValues;
  onVerify: (e: AddressFormValues) => unknown;
};

export default function AddressVerify({
  modalKey,
  title,
  icon,
  defaultValues,
  onVerify,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<AddressFormValues>({
    defaultValues,
  });
  const headTitle = `将数据转发到 ${title}`;
  const [verify, setVerify] = useState(true);

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onVerify(formValues);
    }
    setVerify(!!getValues('address') && !!getValues('name'));
  };
  return (
    <Box>
      <ModalContentTitle icon={icon} title={headTitle} />
      <FormControl
        label="数据库地址"
        id="form-verify"
        formControlStyle={{ mt: '20px' }}
      >
        <Flex
          border="1px solid"
          borderColor={verify ? 'gray.200' : 'red.500'}
          borderRadius="4px"
        >
          <TextField
            id="address"
            label={false}
            isDisabled={modalKey === 'edit'}
            error={errors.address}
            registerReturn={register('address', {
              required: { value: true, message: '请输入数据库地址' },
            })}
            defaultValue={defaultValues?.address}
            formControlStyle={{ w: '70%', mb: '0' }}
            inputStyle={{ borderWidth: '0', mb: '0', borderRadius: '0' }}
            formHelperStyle={{ mt: 0, position: 'absolute', bottom: '-28px' }}
            formLabelStyle={{ mb: 0 }}
          />
          <Box height="" width="1px" bg={verify ? 'gray.200' : 'red.500'} />
          <TextField
            id="name"
            label={false}
            isDisabled={modalKey === 'edit'}
            error={errors.name}
            placeholder="数据库名称"
            registerReturn={register('name', {
              required: { value: true, message: '请输入数据库名称' },
            })}
            formControlStyle={{ w: '30%', mb: '0' }}
            inputStyle={{ borderWidth: '0', mb: '0', borderRadius: '0' }}
            formLabelStyle={{ mb: 0 }}
            formHelperStyle={{ mt: 0, position: 'absolute', bottom: '-28px' }}
          />
        </Flex>
        <Flex mt={verify ? '20px' : '40px'}>
          <TextField
            id="userName"
            error={errors.userName}
            placeholder="用户名"
            registerReturn={register('userName', {
              required: { value: true, message: '请输入用户名' },
            })}
            formControlStyle={{ mr: '6px' }}
          />
          <TextField
            id="passWord"
            type="password"
            error={errors.passWord}
            placeholder="密码"
            autoComplete="new-password"
            registerReturn={register('passWord', {
              required: { value: true, message: '请输入密码' },
            })}
            formControlStyle={{ ml: '6px' }}
          />
        </Flex>
        <Flex justifyContent="end">
          <Button onClick={handleConfirm} colorScheme="brand">
            验证
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
}
