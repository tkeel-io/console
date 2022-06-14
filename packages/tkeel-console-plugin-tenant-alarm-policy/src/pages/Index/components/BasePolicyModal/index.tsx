import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
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
import type { PlatformRule } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import usePlatformRulesQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import type { RuleDesc } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';

import type { DeviceCondition } from '../DeviceRuleDescriptionCard';
import DeviceRuleDescriptionCard, {
  defaultDeviceCondition,
  getTelemetryInfo,
} from '../DeviceRuleDescriptionCard';
import DeviceSelectField from '../DeviceSelectField';
import FormCard from '../FormCard';
import PlatformRuleDescriptionCard from '../PlatformRuleDescriptionCard';

const { TextField, SelectField } = FormField;

type Props = {
  policy?: Policy;
  ruleDescList?: RuleDesc[];
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (data: RequestData) => void;
};

interface FormValues {
  ruleName: string;
  alarmType?: string;
  alarmRuleType: string;
  alarmLevel?: string;
  alarmSourceObject: 'device' | 'platform';
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

const getRequestDeviceConditions = (deviceConditions: DeviceCondition[]) => {
  return deviceConditions.map((item) => {
    const {
      telemetry,
      time,
      polymerize,
      numberOperator,
      booleanOperator,
      booleanValue,
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
    const value = isBoolean ? booleanValue : numberValue;

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
};

export default function BasePolicyModal({
  policy,
  ruleDescList,
  title,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const { platformRules } = usePlatformRulesQuery();

  const [platformRuleList, setPlatformRuleList] = useState<PlatformRule[]>([]);

  const thresholdAlarm = String(AlarmRuleType.Threshold);
  let defaultValues: FormValues = {
    ruleName: '',
    alarmRuleType: thresholdAlarm,
    alarmSourceObject: 'device',
    deviceInfo: '{}',
    condition: Condition.Or,
    deviceConditions: [defaultDeviceCondition],
  };

  if (policy) {
    const {
      ruleName,
      alarmType,
      alarmLevel,
      deviceId,
      deviceName,
      alarmRuleType,
    } = policy;

    defaultValues = {
      ruleName,
      alarmType: String(alarmType),
      alarmRuleType: String(alarmRuleType),
      alarmLevel: String(alarmLevel),
      alarmSourceObject: 'device',
      deviceInfo: JSON.stringify({
        id: deviceId || '',
        name: deviceName || '',
      }),
      condition: Condition.Or,
      deviceConditions: [],
    };
  }

  const {
    register,
    formState: { errors },
    control,
    trigger,
    setValue,
    getValues,
    watch,
  } = useForm<FormValues>({
    defaultValues,
  });

  const fieldArrayReturn = useFieldArray({
    control,
    name: 'deviceConditions',
  });

  const { append } = fieldArrayReturn;

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      const {
        ruleName,
        alarmType,
        alarmRuleType,
        alarmLevel,
        deviceInfo,
        condition,
        deviceConditions,
      } = values;

      const requestDeviceConditions =
        getRequestDeviceConditions(deviceConditions);

      let data: RequestData = {
        ruleName,
        alarmType: Number(alarmType),
        alarmRuleType: Number(alarmRuleType),
        alarmLevel: Number(alarmLevel),
        alarmSourceObject:
          alarmRuleType === thresholdAlarm
            ? AlarmSourceObject.Device
            : AlarmSourceObject.Platform,
        condition,
      };

      if (Number(alarmRuleType) === AlarmRuleType.System) {
        data = {
          ...data,
          platformRuleList,
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

  const isSystemAlarm = watch('alarmRuleType') === String(AlarmRuleType.System);

  useEffect(() => {
    setValue('alarmSourceObject', isSystemAlarm ? 'platform' : 'device');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSystemAlarm]);

  useEffect(() => {
    if (policy?.alarmSourceObject === AlarmSourceObject.Platform) {
      const platformRuleIdStr = ruleDescList?.[0]?.platRuleId || '';
      const platformRuleIds = platformRuleIdStr.split(',');
      const ruleList = platformRules.filter((rule) =>
        platformRuleIds.includes(String(rule.id))
      );
      setPlatformRuleList(ruleList);
    }
  }, [ruleDescList, platformRules, policy]);

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
            error={errors.alarmLevel}
            rules={{
              required: { value: true, message: '请输入告警级别' },
            }}
          />
        </FormCard>
        <FormCard title="告警资源">
          <SelectField<FormValues>
            id="alarmSourceObject"
            name="alarmSourceObject"
            label="告警源对象"
            placeholder="请选择"
            options={
              isSystemAlarm
                ? systemAlarmSourceObjectOptions
                : thresholdAlarmSourceObjectOptions
            }
            control={control}
          />
          {!isSystemAlarm && (
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
                rules={platformRules}
                selectedRules={platformRuleList}
                onChange={setPlatformRuleList}
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
