import { Flex } from '@chakra-ui/react';

// import dayjs from 'dayjs';
import { DateRangePicker, Select } from '@tkeel/console-components';

import {
  ALARMS_LEVEL_ARR,
  ALARMS_POLICY,
  ALARMS_SOURCE,
  ALARMS_TYPES,
} from '@/tkeel-console-plugin-tenant-alarms/constants';

export default function Filter() {
  return (
    <Flex>
      {/* label="级别：" */}
      <Select placeholder="请选择级别">
        {ALARMS_LEVEL_ARR.map((item) => {
          return (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select>
      {/* label="告警类型：" */}
      <Select placeholder="请选择告警类型">
        {ALARMS_POLICY.map((item, index) => {
          return (
            <Select.Option key={item.label} value={index}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select>
      {/*  label="告警策略类型：" */}
      <Select placeholder="请选择告警策略类型">
        {ALARMS_TYPES.map((item, index) => {
          return (
            <Select.Option key={item} value={index}>
              {item}
            </Select.Option>
          );
        })}
      </Select>

      {/*  label="告警源对象："  */}
      <Select placeholder="请选择告警源对象">
        {/*  eslint-disable-next-line sonarjs/no-identical-functions */}
        {ALARMS_SOURCE.map((item, index) => {
          return (
            <Select.Option key={item} value={index}>
              {item}
            </Select.Option>
          );
        })}
      </Select>

      <DateRangePicker
      // startTime={startDate}
      // endTime={endDate}
      // defaultValue={[startDate, endDate]}
      // disabledDate={(date: Date) => {
      //   return (
      //     dayjs(date).isBefore(dayjs().subtract(3, 'day'), 'day') ||
      //     dayjs(date).isAfter(dayjs(), 'day')
      //   );
      // }}
      // onOk={(date: [Date, Date]) => {
      //   const requestStartTime = dayjs(date[0]).unix();
      //   const requestEndTime = dayjs(date[1]).unix();
      //   setStartTime(requestStartTime);
      //   setEndTime(requestEndTime);
      //   if (hasIdentifiers) {
      //     handleRequestData();
      //   }
      // }}
      />
    </Flex>
  );
}
