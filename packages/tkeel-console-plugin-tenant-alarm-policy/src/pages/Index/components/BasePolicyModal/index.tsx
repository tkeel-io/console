import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

import {
  ALARM_LEVEL_OPTIONS,
  ALARM_TYPE_OPTIONS,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';

import DeviceSelectField from '../DeviceSelectField';
import FormCard from '../FormCard';

const { TextField, SelectField } = FormField;

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

interface PolicyField {
  name: string;
  alarmType: string;
  alarmLevel: string;
  alarmSourceObject: string;
}

export default function BasePolicyModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useForm<PolicyField>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      // eslint-disable-next-line no-console
      console.log('values', values);
    }
    onConfirm();
  };

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
          <SelectField<PolicyField>
            id="alarmType"
            name="alarmType"
            label="告警类型"
            placeholder="请选择"
            options={ALARM_TYPE_OPTIONS}
            control={control}
            // defaultValue={defaultValues?.alarmType}
            error={errors.alarmType}
            rules={{
              required: { value: true, message: '告警类型' },
            }}
          />
          <SelectField<PolicyField>
            id="alarmLevel"
            name="alarmLevel"
            label="告警级别"
            placeholder="请选择"
            options={ALARM_LEVEL_OPTIONS}
            control={control}
            // defaultValue={defaultValues?.alarmLevel}
            error={errors.alarmLevel}
            rules={{
              required: { value: false, message: '告警级别' },
            }}
          />
        </FormCard>
        <FormCard title="告警资源">
          <SelectField<PolicyField>
            id="alarmSourceObject"
            name="alarmSourceObject"
            label="告警源对象"
            placeholder="请选择"
            options={[]}
            control={control}
            // defaultValue={defaultValues?.alarmSourceObject}
            error={errors.alarmSourceObject}
            rules={{
              required: { value: false, message: '告警源对象' },
            }}
          />
          <DeviceSelectField styles={{ wrapper: { marginTop: '32px' } }} />
        </FormCard>
        <FormCard title="规则描述">规则描述</FormCard>
      </Flex>
    </Modal>
  );
}
