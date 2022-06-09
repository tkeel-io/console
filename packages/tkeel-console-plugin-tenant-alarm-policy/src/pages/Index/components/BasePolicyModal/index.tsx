import { Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  Modal,
  RadioButton,
} from '@tkeel/console-components';
import { TelemetryType } from '@tkeel/console-request-hooks';
import { AlarmRuleType, AlarmSourceObject } from '@tkeel/console-types';

import {
  ALARM_LEVEL_OPTIONS,
  ALARM_RULE_TYPE_MAP_OPTIONS,
  ALARM_TYPE_OPTIONS,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import {
  Condition,
  Operator,
  Polymerize,
  RequestData,
  TelemetryType as RequestTelemetryType,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';

import type { DeviceCondition } from '../DeviceRuleDescriptionCard';
import DeviceRuleDescriptionCard, {
  defaultDeviceCondition,
  getTelemetryInfo,
} from '../DeviceRuleDescriptionCard';
import DeviceSelectField from '../DeviceSelectField';
import FormCard from '../FormCard';
import type { PlatformCondition } from '../PlatformRuleDescriptionCard';
import PlatformRuleDescriptionCard from '../PlatformRuleDescriptionCard';

const { TextField, SelectField } = FormField;

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (data: RequestData) => void;
};

interface FormValues {
  ruleName: string;
  alarmType: string;
  alarmRuleType: string;
  alarmLevel: string;
  thresholdAlarmSourceObject: 'device';
  systemAlarmSourceObject: 'platform';
  deviceInfo: string;
  condition: Condition;
  deviceConditions: DeviceCondition[];
}

const getDeviceInfo = (deviceInfo: string) => {
  return (deviceInfo ? JSON.parse(deviceInfo) : { id: '', name: '' }) as {
    id: string;
    name: string;
  };
};

export default function BasePolicyModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const [platformConditions, setPlatformConditions] = useState<
    PlatformCondition[]
  >([]);
  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      alarmRuleType: '0',
      thresholdAlarmSourceObject: 'device',
      systemAlarmSourceObject: 'platform',
      condition: Condition.Or,
      deviceConditions: [defaultDeviceCondition],
    },
  });

  const fieldArrayReturn = useFieldArray({
    control,
    name: 'deviceConditions',
  });

  const { append } = fieldArrayReturn;

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      // eslint-disable-next-line no-console
      console.log('platformConditions', platformConditions);
      const {
        ruleName,
        alarmType,
        alarmRuleType,
        alarmLevel,
        deviceInfo,
        condition,
        deviceConditions,
      } = values;

      const requestDeviceConditions = deviceConditions.map((item) => {
        const {
          telemetry,
          time,
          polymerize,
          numberOperator,
          booleanOperator,
          booleanItem,
          numberValue,
        } = item;

        const {
          id: telemetryId,
          name: telemetryName,
          type: telemetryType,
        } = getTelemetryInfo(telemetry || '{}');
        // TODO: 遥测属性暂时不支持添加枚举类型值，支持后需要做处理
        const isBoolean = telemetryType === TelemetryType.Bool;
        const operator = isBoolean ? booleanOperator : numberOperator;
        const value = isBoolean ? booleanItem : numberValue;

        return {
          telemetryId,
          telemetryName,
          telemetryType: isBoolean
            ? RequestTelemetryType.Bool
            : RequestTelemetryType.Common,
          time: time as Time,
          polymerize: polymerize as Polymerize,
          operator: operator as Operator,
          value,
        };
      });

      let data: RequestData = {
        ruleName,
        alarmType: Number(alarmType),
        alarmRuleType: Number(alarmRuleType),
        alarmLevel: Number(alarmLevel),
        alarmSourceObject:
          alarmRuleType === '0'
            ? AlarmSourceObject.Device
            : AlarmSourceObject.Platform,
        condition,
      };

      if (Number(alarmRuleType) === AlarmRuleType.System) {
        const platformAlarmRule: Record<string, string> = {};

        platformConditions.forEach(({ label, value }) => {
          platformAlarmRule[label] = value;
        });

        data = {
          ...data,
          platformAlarmRule,
        };
      } else {
        const { id: deviceId, name: deviceName } = getDeviceInfo(deviceInfo);
        data = {
          ...data,
          deviceId,
          deviceName,
          deviceCondition: requestDeviceConditions,
        };
      }

      onConfirm(data);
    }
  };

  const thresholdAlarmSourceObjectOptions = [
    {
      label: '设备',
      value: 'device',
    },
  ];

  const systemAlarmSourceObjectOptions = [
    {
      label: '平台',
      value: 'platform',
    },
  ];

  const isSystemAlarm = watch('alarmRuleType') === '1';

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
            id="ruleName"
            label="告警策略名称"
            error={errors.ruleName}
            registerReturn={register('ruleName', {
              required: { value: true, message: '请输入告警策略名称' },
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
              required: { value: true, message: '请输入告警类型' },
            }}
          />
          <FormControl id="alarmRuleType" label="告警策略类型">
            <Controller
              name="alarmRuleType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton
                  options={ALARM_RULE_TYPE_MAP_OPTIONS}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
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
              required: { value: true, message: '请输入告警级别' },
            }}
          />
        </FormCard>
        <FormCard title="告警资源">
          {isSystemAlarm ? (
            <SelectField<FormValues>
              id="systemAlarmSourceObject"
              name="systemAlarmSourceObject"
              label="告警源对象"
              placeholder="请选择"
              options={systemAlarmSourceObjectOptions}
              control={control}
            />
          ) : (
            <>
              <SelectField<FormValues>
                id="thresholdAlarmSourceObject"
                name="thresholdAlarmSourceObject"
                label="告警源对象"
                placeholder="请选择"
                options={thresholdAlarmSourceObjectOptions}
                control={control}
              />
              <FormControl id="deviceInfo" error={errors.deviceInfo}>
                <Controller
                  name="deviceInfo"
                  control={control}
                  rules={{ required: { value: true, message: '请选择设备' } }}
                  render={({ field: { onChange } }) => (
                    <DeviceSelectField
                      onChange={onChange}
                      styles={{ wrapper: { marginTop: '32px' } }}
                    />
                  )}
                />
              </FormControl>
            </>
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
          <Flex
            width="100%"
            padding="16px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="grayAlternatives.100"
            borderRadius="4px"
            backgroundColor="gray.100"
          >
            {isSystemAlarm ? (
              <PlatformRuleDescriptionCard
                conditions={platformConditions}
                onChange={setPlatformConditions}
              />
            ) : (
              <DeviceRuleDescriptionCard<FormValues>
                deviceId={getDeviceInfo(watch('deviceInfo'))?.id}
                register={register}
                control={control}
                append={() => {
                  append(defaultDeviceCondition);
                }}
                fieldArrayReturn={fieldArrayReturn}
              />
            )}
          </Flex>
        </FormCard>
      </Flex>
    </Modal>
  );
}
