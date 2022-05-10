import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  proxyName: string;
  proxyIp: string;
  proxyPort: string;
  proxyAgree: string;
  proxyRemark: string;
}

type Props = {
  title: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseProxyModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  // const options = [
  //   { value: 'HTTP', label: 'HTTP' },
  //   { value: 'HTTPS', label: 'HTTPS' },
  //   { value: 'TCP', label: 'TCP' },
  //   { value: 'SSH', label: 'SSH' },
  // ];

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
    // control,
  } = useForm<FormValues>({
    defaultValues,
  });
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
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
      <TextField
        label="代理服务端口"
        id="proxyAgree"
        error={errors.proxyAgree}
        registerReturn={register('proxyAgree', {
          required: { value: true, message: '代理网关名称为空' },
        })}
      />
      {/* <SelectField<FormValues>
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
      /> */}
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
