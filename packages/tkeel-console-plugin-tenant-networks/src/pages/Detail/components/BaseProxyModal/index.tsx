import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';
import { SmartObjectTwoToneIcon, TrashFilledIcon } from '@tkeel/console-icons';

import BindDeviceButton from '../BindDeviceButton';

const { TextField, TextareaField, SelectField } = FormField;

export interface FormValues {
  proxyId?: string;
  proxyName: string;
  proxyIp: string;
  proxyPort: string;
  proxyAgree: string;
  proxyRemark: string;
  proxyDeviceId: string;
  proxyDeviceName: string;
}

interface Props {
  title: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
}

export default function BaseProxyModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const options = [
    { value: 'HTTP', label: 'HTTP' },
    // { value: 'HTTPS', label: 'HTTPS' },
    // { value: 'TCP', label: 'TCP' },
    // { value: 'SSH', label: 'SSH' },
  ];
  const [proxyDeviceId, setProxyDeviceId] = useState(
    defaultValues?.proxyDeviceId ?? ''
  );
  const [proxyDeviceName, setProxyDeviceName] = useState(
    defaultValues?.proxyDeviceName ?? ''
  );

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues,
  });
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = { ...getValues(), proxyDeviceId, proxyDeviceName };
      onConfirm(formValues);
      reset();
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <TextField
        label="代理服务名称"
        id="proxyName"
        error={errors.proxyName}
        registerReturn={register('proxyName', {
          required: { value: true, message: '代理网关名称为空' },
        })}
      />
      <TextField
        label="代理服务IP地址"
        id="proxyIp"
        error={errors.proxyIp}
        registerReturn={register('proxyIp', {
          required: { value: true, message: '代理服务IP地址为空' },
        })}
      />
      <TextField
        label="代理服务端口"
        id="proxyPort"
        error={errors.proxyPort}
        registerReturn={register('proxyPort', {
          required: { value: true, message: '代理服务端口为空' },
        })}
      />
      <SelectField<FormValues>
        id="proxyAgree"
        name="proxyAgree"
        label="代理服务协议类型"
        placeholder="请选择"
        options={options}
        control={control}
        defaultValue={defaultValues?.proxyAgree}
        error={errors.proxyAgree}
        rules={{
          required: { value: true, message: '代理服务协议类型' },
        }}
      />
      <FormControl label="绑定设备" id="proxyDevice">
        {proxyDeviceName === '' ? (
          <BindDeviceButton
            deviceMsg={(device: { deviceId: string; deviceName: string }) => {
              const { deviceId, deviceName } = device;
              setProxyDeviceId(deviceId);
              setProxyDeviceName(deviceName);
            }}
          />
        ) : (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            h="45px"
            bg="gray.100"
            p="0 22px"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <SmartObjectTwoToneIcon
                size="17px"
                color="grayAlternatives.300"
              />
              <Text color="gray.800" fontSize="12px" ml="10px">
                {proxyDeviceName}
              </Text>
            </Flex>
            <Box cursor="pointer">
              <TrashFilledIcon
                size="14px"
                color="gray.700"
                onClick={() => {
                  setProxyDeviceName('');
                  setProxyDeviceId('');
                }}
              />
            </Box>
          </Flex>
        )}
      </FormControl>
      <TextareaField
        id="proxyRemark"
        label="备注"
        placeholder="请输入"
        error={errors.proxyRemark}
        registerReturn={register('proxyRemark')}
      />
    </Modal>
  );
}
