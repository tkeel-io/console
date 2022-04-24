import * as dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';

import { Select } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';

export enum TimeType {
  FiveMinutes = 'fiveMinutes',
  ThirtyMinutes = 'thirtyMinutes',
  OneHour = 'oneHour',
  Custom = 'custom',
}

type Props = {
  timeType: TimeType;
  hasIdentifiers: boolean;
  setTimeType: Dispatch<SetStateAction<TimeType>>;
  setStartTime: Dispatch<SetStateAction<number>>;
  setEndTime: Dispatch<SetStateAction<number>>;
  handleTelemetryDataMutate: () => unknown;
};

export function getRecentTimestamp(num: number, unit = 'minute') {
  return dayjs().subtract(num, unit).unix();
}

export default function DateSelect({
  timeType,
  hasIdentifiers,
  setTimeType,
  setStartTime,
  setEndTime,
  handleTelemetryDataMutate,
}: Props) {
  const selectOptions = [
    {
      label: '5 分钟',
      value: TimeType.FiveMinutes,
    },
    {
      label: '30 分钟',
      value: TimeType.ThirtyMinutes,
    },
    {
      label: '1 小时',
      value: TimeType.OneHour,
    },
    {
      label: '自定义',
      value: TimeType.Custom,
    },
  ];
  const borderGrayColor = useColor('gray.200');

  return (
    <Select
      options={selectOptions}
      onChange={(value) => {
        const timeTypeValue = value as TimeType;
        setTimeType(timeTypeValue);

        let requestStartTime = getRecentTimestamp(3, 'day');
        const requestEndTime = dayjs().unix();

        if (value === TimeType.FiveMinutes) {
          requestStartTime = getRecentTimestamp(5);
        }

        if (value === TimeType.ThirtyMinutes) {
          requestStartTime = getRecentTimestamp(30);
        }

        if (value === TimeType.OneHour) {
          requestStartTime = getRecentTimestamp(1, 'hour');
        }

        setStartTime(requestStartTime);
        setEndTime(requestEndTime);

        if (hasIdentifiers) {
          handleTelemetryDataMutate();
        }
      }}
      value={timeType}
      style={{
        marginRight: '10px',
        width: '89px',
      }}
      styles={{
        selector: `padding: 0; line-height: 34px; border-color: ${borderGrayColor};`,
        selectionSearch: 'padding: 0; line-height: 34px;',
        selectionItem: 'top: 0; left: 10px; line-height: 34px;',
        arrow: 'top: 10px; right: 10px',
        dropdown: 'padding: 5px; min-height: 42px;',
        itemOptionState: 'display: none',
      }}
    />
  );
}
