import { Flex, useTheme } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import dayjs from 'dayjs';
import type {
  AlarmLevel,
  AlarmPolicyType,
  AlarmSource,
  AlarmStatus,
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
import { CalendarFilledIcon } from '@tkeel/console-icons';
import { Theme } from '@tkeel/console-themes';

import AlarmPolicyTypeSelect from '@/tkeel-console-plugin-tenant-alarms/components/AlarmPolicyTypeSelect';
import {
  ALARMS_SOURCE,
  ALARMS_STATUS,
} from '@/tkeel-console-plugin-tenant-alarms/constants';

// combine, allowedMaxDays, afterToday
const { before, combine, afterToday } = DateRangePicker.PickerUtils;
export type ValueType = [Date?, Date?];

const selectorStyle = {
  selector: {
    backgroundColor: 'white',
    fontWeight: 'normal',
  },
};

export interface Props {
  onChange: (params: Omit<RequestParams, 'pageNum' | 'pageSize'>) => void;
}

function Filter({ onChange }: Props) {
  const { colors } = useTheme<Theme>();

  // combine && allowedMaxDays && afterToday
  const dateDisabled =
    before && combine && afterToday
      ? {
          disabledDate: combine(
            before(dayjs().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss')),
            afterToday()
          ), // combine(allowedMaxDays(7), afterToday()),
        }
      : {};
  return (
    <PageHeaderToolbar
      name={
        <Flex gap="12px" className="alarms-page-header-filters">
          <Select
            labelPrefix="状态："
            showDefaultOption
            options={ALARMS_STATUS}
            onChange={(alarmStatus) => {
              onChange({
                alarmStatus: Number(
                  alarmStatus === '' ? -1 : alarmStatus
                ) as AlarmStatus,
              });
            }}
            styles={{
              wrapper: {
                width: '120px',
              },
              ...selectorStyle,
            }}
          />

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
              onChange({
                alarmSource: Number(
                  alarmSource === '' ? -1 : alarmSource
                ) as AlarmSource,
              });
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
            caretAs={CalendarFilledIcon}
            onOk={([start, end]: ValueType) => {
              onChange({
                startTime: dayjs(start).unix(),
                endTime: dayjs(end).unix(),
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

                .rs-picker-toggle-clean {
                  top: 5px !important;
                }

                .rs-picker .rs-btn-default {
                  border-radius: 4px;
                }

                .rs-picker-toggle-caret {
                  top: 5px !important;
                  color: ${colors.gray[300]};
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
          backgroundColor: 'gray.100',
        },
      }}
    />
  );
}

export default Filter;
