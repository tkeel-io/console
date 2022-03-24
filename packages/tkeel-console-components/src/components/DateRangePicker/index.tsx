import 'rsuite/DateRangePicker/styles/index.less';

// import { Text } from '@chakra-ui/react';
// import * as dayjs from 'dayjs';
// import { useState } from 'react';
import RsuiteDateRangePicker, {
  DateRangePickerProps,
} from 'rsuite/DateRangePicker';

// import './style.scss';
import DateRangePickerStyles from './DateRangePickerStyles';

// type DateRange = [Date, Date];

type Props = DateRangePickerProps & {
  format?: string;
  startTime?: Date;
  endTime?: Date;
};

export default function DateRangePicker({
  format = 'yyyy-MM-dd HH:mm:ss',
  startTime,
  endTime,
  ...rest
}: Props) {
  // const [selectedRangeLabel, setSelectedRangeLabel] = useState('');

  // const renderRangeLabel = (timeText: string) => {
  //   return (
  //     <Text
  //       color={selectedRangeLabel === timeText ? 'primary' : 'inherit'}
  //       onClick={() => setSelectedRangeLabel(timeText)}
  //     >
  //       {timeText}
  //     </Text>
  //   );
  // };

  // const nowDate = dayjs().toDate();
  // const ranges = [
  //   {
  //     label: renderRangeLabel('5分钟'),
  //     value: [dayjs().subtract(5, 'minute').toDate(), nowDate] as DateRange,
  //   },
  //   {
  //     label: renderRangeLabel('30分钟'),
  //     value: [dayjs().subtract(30, 'minute').toDate(), nowDate] as DateRange,
  //   },
  //   {
  //     label: renderRangeLabel('1小时'),
  //     value: [dayjs().subtract(1, 'hour').toDate(), nowDate] as DateRange,
  //   },
  // ];

  return (
    <>
      <DateRangePickerStyles />
      <RsuiteDateRangePicker
        format={format}
        placeholder="请选择时间范围"
        cleanable={false}
        ranges={[]}
        locale={{
          sunday: '日',
          monday: '一',
          tuesday: '二',
          wednesday: '三',
          thursday: '四',
          friday: '五',
          saturday: '六',
          formattedDayPattern: 'yyyy-MM-dd',
          ok: '确定',
        }}
        {...rest}
      />
    </>
  );
}
