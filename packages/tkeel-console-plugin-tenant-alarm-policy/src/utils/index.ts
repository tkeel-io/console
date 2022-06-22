import { hasJsonStructure } from '@tkeel/console-utils';

import {
  Operator,
  Polymerize,
  RequestTelemetryType,
  Time,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useCreatePolicyMutation';
import type { RuleDesc } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/useRuleDescQuery';
import type {
  BaseOperator,
  DeviceCondition,
} from '@/tkeel-console-plugin-tenant-alarm-policy/pages/Index/components/DeviceRuleDescriptionCard';

export const parseBooleanEnumValue = (value: string | undefined) => {
  if (value && hasJsonStructure(value)) {
    return JSON.parse(value) as {
      label: string;
      value: string;
    };
  }
  return { label: '', value: '' };
};

interface TelemetryInfo {
  id: string;
  name: string;
  type: RequestTelemetryType;
}

export const parseTelemetryInfo = (telemetry: string | null) => {
  if (telemetry && hasJsonStructure(telemetry)) {
    return JSON.parse(telemetry) as TelemetryInfo;
  }
  return {
    id: '',
    name: '',
    type: RequestTelemetryType.Common,
  };
};

export const getRequestDeviceConditions = (
  deviceConditions: DeviceCondition[]
) => {
  return deviceConditions.map((item) => {
    const {
      telemetry,
      time,
      polymerize,
      numberOperator,
      numberValue,
      booleanOperator,
      booleanValue,
      enumOperator,
      enumValue,
    } = item;

    const {
      id: telemetryId,
      name: telemetryName,
      type: telemetryType,
    } = parseTelemetryInfo(telemetry);

    let requestTelemetryType = RequestTelemetryType.Common;
    let operator = numberOperator;
    let value = numberValue;
    let label = '';

    const isBoolean = telemetryType === RequestTelemetryType.Bool;
    const isEnum = telemetryType === RequestTelemetryType.Enum;

    if (isBoolean) {
      requestTelemetryType = RequestTelemetryType.Bool;
      operator = booleanOperator;
      value = parseBooleanEnumValue(booleanValue).value;
      label = parseBooleanEnumValue(booleanValue).label;
    }

    if (isEnum) {
      requestTelemetryType = RequestTelemetryType.Enum;
      operator = enumOperator;
      value = parseBooleanEnumValue(enumValue).value;
      label = parseBooleanEnumValue(enumValue).label;
    }

    const baseDeviceConditions = {
      telemetryId,
      telemetryName,
      telemetryType: requestTelemetryType,
      operator: operator as Operator,
      value,
      label,
    };

    if (isBoolean || isEnum) {
      return baseDeviceConditions;
    }

    return {
      ...baseDeviceConditions,
      time: time as Time,
      polymerize: polymerize as Polymerize,
    };
  });
};

export const getDeviceConditionsByRuleDesc = (ruleDescList: RuleDesc[]) => {
  return ruleDescList.map((ruleDesc) => {
    const {
      telemetryType,
      telemetryId,
      telemetryName,
      operator,
      value,
      label,
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
        booleanOperator: operator as BaseOperator,
        booleanValue: JSON.stringify({ label, value }),
      };
    }

    if (telemetryType === RequestTelemetryType.Enum) {
      return {
        telemetry,
        enumOperator: operator as BaseOperator,
        enumValue: JSON.stringify({ label, value }),
      };
    }

    return {
      telemetry,
      time,
      polymerize,
      numberOperator: operator,
      numberValue: value || '',
    };
  });
};
