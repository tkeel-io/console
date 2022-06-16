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
  RequestTelemetryType,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import type { PlatformRule } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import usePlatformRulesQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import type { RuleDesc } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';

import type {
  BooleanOperator,
  DeviceCondition,
} from '../DeviceRuleDescriptionCard';
import DeviceRuleDescriptionCard, {
  defaultDeviceCondition,
  getTelemetryInfo,
} from '../DeviceRuleDescriptionCard';
import DeviceSelectField, { getDeviceInfo } from '../DeviceSelectField';
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
  const [deviceConditionsErrors, setDeviceConditionsErrors] = useState<
    number[]
  >([]);
  const [isShowPlatformRuleListError, setIsShowPlatformRuleListError] =
    useState(false);

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
      tempId,
      tempName,
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
        tempId: tempId || '',
        tempName: tempName || '',
        deviceId: deviceId || '',
        deviceName: deviceName || '',
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

  const handleSetDeviceConditionsErrors = () => {
    const { deviceConditions } = getValues();

    const errorIndexArr: number[] = [];
    getRequestDeviceConditions(deviceConditions).forEach((condition, i) => {
      const { telemetryId, operator, value } = condition;
      if (!telemetryId || !operator || !value) {
        errorIndexArr.push(i);
      }
    });

    setDeviceConditionsErrors(errorIndexArr);

    return errorIndexArr.length > 0;
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (!result) {
      return;
    }

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

    const isThresholdAlarm = alarmRuleType === thresholdAlarm;
    const isSystemAlarm = alarmRuleType === String(AlarmRuleType.System);

    if (isThresholdAlarm && handleSetDeviceConditionsErrors()) {
      return;
    }

    if (isSystemAlarm && platformRuleList.length === 0) {
      setIsShowPlatformRuleListError(true);
      return;
    }

    let data: RequestData = {
      ruleName,
      alarmType: Number(alarmType),
      alarmRuleType: Number(alarmRuleType),
      alarmLevel: Number(alarmLevel),
      alarmSourceObject: isThresholdAlarm
        ? AlarmSourceObject.Device
        : AlarmSourceObject.Platform,
      condition,
    };

    data =
      Number(alarmRuleType) === AlarmRuleType.System
        ? {
            ...data,
            platformRuleList,
          }
        : {
            ...data,
            ...getDeviceInfo(deviceInfo),
            deviceCondition: getRequestDeviceConditions(deviceConditions),
          };

    onConfirm(data);
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

  useEffect(() => {
    const deviceConditions =
      ruleDescList?.map((ruleDesc) => {
        const {
          telemetryType,
          telemetryId,
          telemetryName,
          operator,
          value,
          time,
          polymerize,
        } = ruleDesc;
        const telemetry = JSON.stringify({
          id: telemetryId,
          name: telemetryName,
          type: telemetryType,
        });

        if (telemetryType === RequestTelemetryType.Bool) {
          return {
            telemetry,
            booleanOperator: operator as BooleanOperator,
            booleanValue: value || '',
          };
        }

        // TODO: 需要处理遥测属性为枚举类型的情况
        // if (telemetryType === RequestTelemetryType.Enum) {
        //   return {
        //     telemetry,
        //     enumOperator: operator as BooleanOperator,
        //     enumValue: value || '',
        //   };
        // }

        return {
          telemetry,
          time,
          polymerize,
          numberOperator: operator,
          numberValue: value || '',
        };
      }) ?? [];
    setValue('deviceConditions', deviceConditions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleDescList]);

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
                render={({ field: { value, onChange } }) => (
                  <DeviceSelectField
                    value={value}
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
                isShowPlatformRuleListError={isShowPlatformRuleListError}
                onChange={setPlatformRuleList}
              />
            ) : (
              <DeviceRuleDescriptionCard<FormValues>
                deviceId={getDeviceInfo(watch('deviceInfo'))?.deviceId}
                register={register}
                control={control}
                deviceConditionsErrors={deviceConditionsErrors}
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
