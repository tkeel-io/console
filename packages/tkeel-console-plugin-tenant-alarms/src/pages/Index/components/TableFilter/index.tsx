import { Flex } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import dayjs from 'dayjs';
import type {
  AlarmLevel,
  AlarmPolicyType,
  AlarmSource,
  AlarmType,
  RequestParams,
} from 'packages/tkeel-console-plugin-tenant-alarms/src/types';

import {
  AlarmLevelSelect,
  AlarmTypeSelect,
} from '@tkeel/console-business-components';
import {
  DateRangePicker,
  PageHeaderToolbar,
  Select,
} from '@tkeel/console-components';

import AlarmPolicyTypeSelect from '@/tkeel-console-plugin-tenant-alarms/components/AlarmPolicyTypeSelect';
import { ALARMS_SOURCE } from '@/tkeel-console-plugin-tenant-alarms/constants';

const { combine, allowedMaxDays, afterToday } = DateRangePicker.PickerUtils;
export type ValueType = [Date?, Date?];

const selectorStyle = {
  selector: {
    backgroundColor: 'white',
    fontWeight: 'normal',
  },
};
// export interface ParamsType {
//   alarmLevel?: number;
//   alarmType?: number;
//   alarmStrategy?: number;
//   alarmSource?: number;
//   startTime?: string;
//   endTime?: string;
// }

export interface Props {
  onChange: (params: Omit<RequestParams, 'pageNum' | 'pageSize'>) => void;
}
function Filter({ onChange }: Props) {
  const dateDisabled =
    combine && allowedMaxDays && afterToday
      ? {
          disabledDate: combine(allowedMaxDays(7), afterToday()),
        }
      : {};
  return (
    <PageHeaderToolbar
      name={
        <Flex gap="12px" className="alarms-page-header-filters">
          <AlarmLevelSelect
            styles={selectorStyle}
            onChange={(alarmLevel) => {
              onChange({ alarmLevel: alarmLevel as AlarmLevel });
            }}
          />
          <AlarmTypeSelect
            styles={selectorStyle}
            onChange={(alarmType) => {
              onChange({ alarmType: alarmType as AlarmType });
            }}
          />

          <AlarmPolicyTypeSelect
            styles={selectorStyle}
            onChange={(alarmStrategy) => {
              onChange({ alarmStrategy: alarmStrategy as AlarmPolicyType });
            }}
          />

          <Select
            labelPrefix="告警源对象："
            showDefaultOption
            options={ALARMS_SOURCE}
            onChange={(alarmSource) => {
              onChange({ alarmSource: Number(alarmSource) as AlarmSource });
            }}
            styles={{
              wrapper: {
                width: '140px',
              },
              ...selectorStyle,
            }}
          />
          <DateRangePicker
            {...dateDisabled}
            cleanable
            onOk={([start, end]: ValueType) => {
              onChange({
                startTime: dayjs(start).valueOf(),
                endTime: dayjs(end).valueOf(),
              });
            }}
            onClean={() => {
              onChange({
                startTime: -1,
                endTime: -1,
              });
            }}
          />
          <Global
            styles={css`
              .alarms-page-header-filters {
                .rs-picker.rs-picker-default .rs-picker-toggle.rs-btn {
                  padding-top: 5px;
                  padding-bottom: 5px;
                }

                .rs-picker .rs-btn-default {
                  border-radius: 4px;
                }

                .rs-picker-toggle-caret {
                  top: 5px !important;
                }
              }
            `}
          />
        </Flex>
      }
      styles={{
        wrapper: {
          zIndex: 1,
          padding: '0 20px',
          mt: '16px',
          backgroundColor: 'gray.100',
        },
      }}
    />
  );
}

export default Filter;
