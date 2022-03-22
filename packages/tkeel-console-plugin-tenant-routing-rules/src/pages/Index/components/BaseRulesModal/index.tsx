import { HStack, useRadioGroup } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';
// import { schemas } from '@tkeel/console-utils';
import { RoutesMsgIcon, RoutesTimeIcon } from '@tkeel/console-icons';

import RadioCard from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/RadioCard';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  title: string;
  type: string;
  description?: string;
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseRulesModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
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

  const attribute = {
    size: '24px',
    style: { marginRight: '10px' },
    twoToneColor: 'gray.400', // 二期删掉
    color: 'gray.400', // 二期删掉
  };

  const activeAttribute = {
    twoToneColor: 'green.100',
    color: 'green.300',
  };

  const options = [
    {
      keyOpt: 'msg',
      titleOpt: '消息路由',
      iconOpt: RoutesMsgIcon,
    },
    {
      keyOpt: 'time',
      titleOpt: '时序路由',
      iconOpt: RoutesTimeIcon,
    },
  ];

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: 'routes',
    defaultValue: options[0].keyOpt,
    onChange: (val) => {
      setValue(val);
    },
  });

  const group = getRootProps();

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
        id="title"
        label="规则名称"
        placeholder="请输入"
        error={errors.title}
        registerReturn={register('title', {
          required: { value: true, message: '请输入规则名称' },
        })}
      />
      <FormControl label="路由类型" id="form-routes">
        <HStack {...group}>
          {options.map((item) => {
            const { keyOpt, titleOpt, iconOpt: CustomIcon } = item;
            const radio = getRadioProps({
              value: keyOpt,
            });
            return (
              <RadioCard
                isDisabled
                {...radio}
                key={keyOpt}
                label={titleOpt}
                icon={
                  <CustomIcon
                    {...attribute}
                    {...(radio.isChecked ? activeAttribute : {})}
                  />
                }
              />
            );
          })}
        </HStack>
      </FormControl>
      <TextareaField
        id="description"
        label="描述"
        placeholder="请输入"
        error={errors.description}
        registerReturn={register('description', {
          required: { value: false, message: '' },
        })}
      />
    </Modal>
  );
}
//
