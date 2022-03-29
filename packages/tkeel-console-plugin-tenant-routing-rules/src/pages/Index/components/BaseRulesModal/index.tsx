import { HStack, useRadioGroup } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';
// import { schemas } from '@tkeel/console-utils';
import { RoutesMsgIcon, RoutesTimeIcon } from '@tkeel/console-icons';

import RadioCard from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/RadioCard';

const { TextField, TextareaField } = FormField;

export interface FormValues {
  name: string;
  type: number;
  desc?: string;
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
  const [routeType, setRouteType] = useState('msg');
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
    const routeTypeArr = ['msg', 'time'];
    const typeIndex = routeTypeArr.indexOf(routeType) + 1;
    if (result) {
      const formValues = { ...getValues(), type: typeIndex };
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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'routes',
    defaultValue: options[0].keyOpt,
    onChange: (val) => {
      setRouteType(val);
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
        id="name"
        label="规则名称"
        placeholder="请输入"
        error={errors.name}
        registerReturn={register('name', {
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
                isDisabled // 二期删掉
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
        id="desc"
        label="描述"
        placeholder="请输入"
        error={errors.desc}
        registerReturn={register('desc')}
      />
    </Modal>
  );
}
