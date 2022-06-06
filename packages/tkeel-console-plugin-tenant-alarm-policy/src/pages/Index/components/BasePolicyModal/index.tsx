import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { FormControl, FormField, Modal } from '@tkeel/console-components';

import {
  ALARM_LEVEL_OPTIONS,
  ALARM_TYPE_OPTIONS,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';

import DeviceSelectField from '../DeviceSelectField';
import FormCard from '../FormCard';
import RuleDescriptionCard from '../RuleDescriptionCard';

const { TextField, SelectField } = FormField;

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

interface Condition {
  attribute: string | null;
  duration?: 0 | 1 | 3 | 5 | null; // minute
  calculate?: 'avg' | 'max' | 'min' | null;
  numberOperator?: string | null;
  enumOperator?: string | null;
  numberValue?: string | null;
}

interface FormValues {
  name: string;
  alarmType: string;
  alarmLevel: string;
  alarmSourceObject: string;
  deviceId: string;
  conditionsOperator: 'or' | 'and';
  conditions: Condition[];
}

export default function BasePolicyModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const defaultCondition: Condition = {
    attribute: null,
    duration: 1,
    calculate: 'avg',
    numberOperator: 'gt',
    numberValue: null,
  };

  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      conditionsOperator: 'or',
      conditions: [defaultCondition],
    },
  });

  const fieldArrayReturn = useFieldArray({
    control,
    name: 'conditions',
  });
  const { append } = fieldArrayReturn;

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      // eslint-disable-next-line no-console
      console.log('values', values);
    }
    onConfirm();
  };

  const alarmSourceObjectOptions = [
    {
      label: '设备',
      value: 'device',
    },
    {
      label: '平台',
      value: 'platform',
    },
  ];
  return (
    <Modal
      width="800px"
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
      modalBodyStyle={{ padding: '20px' }}
    >
      <Flex
        flexDirection="column"
        padding="12px 12px 0"
        borderRadius="4px"
        backgroundColor="grayAlternatives.50"
      >
        <FormCard title="告警信息">
          <TextField
            id="name"
            label="告警策略名称"
            error={errors.name}
            registerReturn={register('name', {
              required: { value: false, message: '请输入告警策略名称' },
            })}
          />
          <SelectField<FormValues>
            id="alarmType"
            name="alarmType"
            label="告警类型"
            placeholder="请选择"
            options={ALARM_TYPE_OPTIONS}
            control={control}
            // defaultValue={defaultValues?.alarmType}
            error={errors.alarmType}
            rules={{
              required: { value: false, message: '请输入告警类型' },
            }}
          />
          <SelectField<FormValues>
            id="alarmLevel"
            name="alarmLevel"
            label="告警级别"
            placeholder="请选择"
            options={ALARM_LEVEL_OPTIONS}
            control={control}
            // defaultValue={defaultValues?.alarmLevel}
            error={errors.alarmLevel}
            rules={{
              required: { value: false, message: '请输入告警级别' },
            }}
          />
        </FormCard>
        <FormCard title="告警资源">
          <SelectField<FormValues>
            id="alarmSourceObject"
            name="alarmSourceObject"
            label="告警源对象"
            placeholder="请选择"
            options={alarmSourceObjectOptions}
            control={control}
            // defaultValue={defaultValues?.alarmSourceObject}
            error={errors.alarmSourceObject}
            rules={{
              required: { value: false, message: '请输入告警源对象' },
            }}
          />
          {watch('alarmSourceObject') === 'device' && (
            <FormControl id="deviceId" error={errors.deviceId}>
              <Controller
                name="deviceId"
                control={control}
                rules={{ required: { value: false, message: '请选择设备' } }}
                render={({ field: { onChange } }) => (
                  <DeviceSelectField
                    onChange={onChange}
                    styles={{ wrapper: { marginTop: '32px' } }}
                  />
                )}
              />
            </FormControl>
          )}
        </FormCard>
        <FormCard
          title="规则描述"
          styles={{
            wrapper: {
              display: 'flex',
            },
          }}
        >
          <RuleDescriptionCard<FormValues>
            register={register}
            control={control}
            append={() => {
              append(defaultCondition);
            }}
            fieldArrayReturn={fieldArrayReturn}
          />
        </FormCard>
      </Flex>
    </Modal>
  );
}
