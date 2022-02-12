import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { FormField, Modal } from '@tkeel/console-components';
import { AddFilledIcon } from '@tkeel/console-icons';

const { TextField } = FormField;

type Controls = {
  name: string;
  address: string;
  version: string;
};

function CreatePluginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Controls>();

  const onSubmit: SubmitHandler<Controls> = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('onSubmit ~ values', values);
        onClose();
        resolve(values);
      }, 300);
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
      <Button
        position="absolute"
        right="2px"
        top="2px"
        size="md"
        leftIcon={<AddFilledIcon color="white" />}
        onClick={onOpen}
      >
        创建插件源
      </Button>
      <Modal
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
              required: { value: true, message: 'required' },
            })}
            formControlStyle={{ marginTop: '16px' }}
          />
        </>
      </Modal>
    </>
  );
}

export default CreatePluginButton;
