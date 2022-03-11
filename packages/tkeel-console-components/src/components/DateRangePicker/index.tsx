import 'rsuite/DateRangePicker/styles/index.less';
import './style.scss';

// import { Text } from '@chakra-ui/react';
// import * as dayjs from 'dayjs';
// import { useState } from 'react';
import RsuiteDateRangePicker, {
  DateRangePickerProps,
} from 'rsuite/DateRangePicker';

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

  // const handleEntered = () => {
  //   if (startTime && endTime && dayjs(endTime).isSame(dayjs())) {
  //     if (dayjs(endTime).subtract(5, 'minute').isSame(startTime)) {
  //       setSelectedRangeLabel('5分钟');
  //     } else if (dayjs(endTime).subtract(30, 'minute').isSame(startTime)) {
  //       setSelectedRangeLabel('30分钟');
  //     } else if (dayjs(endTime).subtract(1, 'hour').isSame(startTime)) {
  //       setSelectedRangeLabel('1小时');
  //     }
  //   }
  // };

  return (
    <RsuiteDateRangePicker
      format={format}
      placeholder="请选择时间范围"
      cleanable={false}
      ranges={[]}
      // onEntered={handleEntered}
      {...rest}
    />
  );
}
