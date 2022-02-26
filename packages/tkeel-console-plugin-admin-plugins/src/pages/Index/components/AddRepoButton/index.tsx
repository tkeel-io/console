import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  CreateButton,
  FormField,
  Modal,
  toast,
} from '@tkeel/console-components';

import useAddRepoMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useAddRepoMutation';

const { TextField } = FormField;

type Controls = {
  name: string;
  address: string;
};

type Props = {
  refetchRepos: () => unknown;
};

function AddRepoButton({ refetchRepos }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Controls>();

  const { mutate } = useAddRepoMutation({
    onSuccess() {
      refetchRepos();
      onClose();
      toast({ status: 'success', title: '添加仓库成功' });
    },
  });

  const onSubmit: SubmitHandler<Controls> = (values) => {
    mutate({
      url: `/rudder/v1/repos/${values.name}`,
      data: {
        url: values.address,
      },
    });
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSubmit(values);
    }
  };

  return (
    <>
      <CreateButton position="absolute" right="2px" top="2px" onClick={onOpen}>
        创建插件源
      </CreateButton>
      <Modal
        modalBodyStyle={{ padding: '20px 40px 60px' }}
        title={
          <Text color="gray.800" fontSize="14px">
            设置配置
          </Text>
        }
        footer={
          <>
            <Button onClick={onClose}>取消</Button>
            <Button
              marginLeft="12px"
              colorScheme="primary"
              onClick={handleConfirm}
            >
              确定
            </Button>
          </>
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <>
          <TextField
            id="name"
            label="插件源名称"
            error={errors.name}
            registerReturn={register('name', {
              required: { value: true, message: 'required' },
            })}
          />
          <TextField
            id="address"
            label="插件源地址"
            error={errors.address}
            registerReturn={register('address', {
              required: { value: true, message: '请输入仓库源地址' },
              pattern: {
                value: /^(http|https)?:\/\//,
                message: '请提供合法的仓库源地址',
              },
            })}
            formControlStyle={{ marginTop: '16px' }}
          />
        </>
      </Modal>
    </>
  );
}

export default AddRepoButton;
