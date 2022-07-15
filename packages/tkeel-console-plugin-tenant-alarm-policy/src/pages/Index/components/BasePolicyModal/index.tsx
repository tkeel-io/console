import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  Modal,
  RadioButton,
  Tip,
} from '@tkeel/console-components';
import {
  AlarmRuleType,
  AlarmSourceObject,
  Condition,
} from '@tkeel/console-types';

import {
  ALARM_LEVEL_OPTIONS,
  ALARM_RULE_TYPE_MAP_OPTIONS,
  ALARM_TYPE_OPTIONS,
  systemAlarmSourceObjectOptions,
  thresholdAlarmSourceObjectOptions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import { RequestData as CreatePolicyRequestData } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import type { PlatformRule } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import usePlatformRulesQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';
import {
  Policy,
  Status,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import type { RuleDesc } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';
import {
  getDeviceConditionsByRuleDesc,
  getRequestDeviceConditions,
} from '@/tkeel-console-plugin-tenant-alarm-policy/utils';

import DeviceRuleDescriptionCard, {
  defaultDeviceCondition,
  DeviceCondition,
} from '../DeviceRuleDescriptionCard';
import type { DeviceInfo } from '../DeviceSelectField';
import DeviceSelectField, { parseDeviceInfo } from '../DeviceSelectField';
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
  onConfirm: (data: CreatePolicyRequestData) => void;
};

enum AlarmSourceObjectValue {
  Device = 'device',
  Platform = 'platform',
}

interface FormValues {
  ruleName: string;
  alarmType?: string;
  alarmRuleType: string;
  alarmLevel?: string;
  alarmSourceObject:
    | AlarmSourceObjectValue.Device
    | AlarmSourceObjectValue.Platform;
  deviceInfo: string;
  condition: Condition;
  deviceConditions: DeviceCondition[];
}

function getErrorMessage({
  policy,
  isTemplateDeleted,
  isDeviceDeleted,
}: {
  policy: Policy;
  isTemplateDeleted: boolean;
  isDeviceDeleted: boolean;
}) {
  let errorMessage = '';
  if (isTemplateDeleted) {
    errorMessage = `${
      policy.tempName ? `「${policy.tempName}」` : '该'
    }设备模板已删除，请重新选择告警源对象。`;
  } else if (isDeviceDeleted) {
    errorMessage = '该设备已删除，请重新选择告警源对象。';
  }
  return errorMessage;
}

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
    alarmSourceObject: AlarmSourceObjectValue.Device,
    deviceInfo: '',
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
      alarmSourceObject,
      condition,
    } = policy;

    defaultValues = {
      ruleName,
      alarmType: String(alarmType),
      alarmRuleType: String(alarmRuleType),
      alarmLevel: String(alarmLevel),
      alarmSourceObject:
        alarmSourceObject === AlarmSourceObject.Platform
          ? AlarmSourceObjectValue.Platform
          : AlarmSourceObjectValue.Device,
      deviceInfo: JSON.stringify({
        tempId: tempId || '',
        tempName: tempName || '',
        deviceId: deviceId || '',
        deviceName: deviceName || '',
      }),
      condition,
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
    mode: 'onChange',
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

  const containDeletedTemplateOrDevice = (deviceInfo: DeviceInfo) => {
    const { tempId, deviceId } = deviceInfo;
    const tempIsDeleted =
      policy?.tempStatus === Status.Deleted && tempId === policy?.tempId;
    const deviceIsDeleted =
      policy?.deviceStatus === Status.Deleted && deviceId === policy?.deviceId;

    return tempIsDeleted || deviceIsDeleted;
  };

  const containDeletedTelemetry = () => {
    const { deviceConditions } = getValues();

    return getRequestDeviceConditions(deviceConditions).some(
      ({ telemetryId, telemetryName }) =>
        ruleDescList?.some(
          (rule) =>
            rule.telemetryStatus === Status.Deleted &&
            rule.telemetryId === telemetryId &&
            rule.telemetryName === telemetryName
        )
    );
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

    if (
      containDeletedTemplateOrDevice(parseDeviceInfo(deviceInfo)) ||
      containDeletedTelemetry()
    ) {
      return;
    }

    if (isSystemAlarm && platformRuleList.length === 0) {
      setIsShowPlatformRuleListError(true);
      return;
    }

    let data: CreatePolicyRequestData = {
      ruleId: policy?.ruleId,
      ruleName,
      enable: policy?.enable,
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
            ...parseDeviceInfo(deviceInfo),
            deviceCondition: getRequestDeviceConditions(deviceConditions),
          };

    onConfirm(data);
  };

  const isSystemAlarm = watch('alarmRuleType') === String(AlarmRuleType.System);

  const { tempId, deviceId } = parseDeviceInfo(watch('deviceInfo'));

  const alarmSourceObjectOptions = isSystemAlarm
    ? systemAlarmSourceObjectOptions
    : thresholdAlarmSourceObjectOptions;

  const isTemplateDeleted =
    !!policy?.tempId &&
    !policy.deviceId &&
    policy?.tempStatus === Status.Deleted;
  const isDeviceDeleted =
    !!policy?.deviceId && policy.deviceStatus === Status.Deleted;

  useEffect(() => {
    setValue(
      'alarmSourceObject',
      isSystemAlarm
        ? AlarmSourceObjectValue.Platform
        : AlarmSourceObjectValue.Device
    );
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
    const deviceConditions = getDeviceConditionsByRuleDesc(ruleDescList || []);
    setValue('deviceConditions', deviceConditions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleDescList]);

  useEffect(() => {
    setValue('deviceConditions', [defaultDeviceCondition]);
  }, [tempId, deviceId, setValue]);

  const watchDeviceInfo = watch('deviceInfo');
  useEffect(() => {
    if (watchDeviceInfo === '') {
      setValue('deviceConditions', [defaultDeviceCondition]);
    }
  }, [setValue, watchDeviceInfo]);

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
                  disable={!!policy}
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
          <Box>
            <SelectField<FormValues>
              id="alarmSourceObject"
              name="alarmSourceObject"
              label="告警源对象"
              placeholder="请选择"
              options={alarmSourceObjectOptions}
              control={control}
              formControlStyle={{
                marginBottom: '10px',
              }}
            />
            {policy &&
            containDeletedTemplateOrDevice(parseDeviceInfo(watchDeviceInfo)) ? (
              <Text color="red.300" fontSize="12px">
                {getErrorMessage({
                  policy,
                  isTemplateDeleted,
                  isDeviceDeleted,
                })}
              </Text>
            ) : (
              <Tip title="告警源对象支持模板下全部设备或单个设备" />
            )}
          </Box>
          {!isSystemAlarm && (
            <FormControl
              id="deviceInfo"
              error={errors.deviceInfo}
              formControlStyle={{
                marginBottom: '0',
              }}
            >
              <Controller
                name="deviceInfo"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '请选择模板下全部设备或单个设备',
                  },
                }}
                render={({ field: { value, onChange } }) => {
                  const isError = containDeletedTemplateOrDevice(
                    parseDeviceInfo(value)
                  );
                  return (
                    <DeviceSelectField
                      value={value}
                      onChange={onChange}
                      styles={{
                        root: { marginTop: '32px' },
                        input: isError ? { borderColor: 'red.300' } : {},
                      }}
                    />
                  );
                }}
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
                policy={policy}
                tempId={tempId}
                deviceId={deviceId}
                tempStatus={policy?.tempStatus}
                deviceStatus={policy?.deviceStatus}
                register={register}
                control={control}
                deviceConditionsErrors={deviceConditionsErrors}
                ruleDescList={ruleDescList}
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
