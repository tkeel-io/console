import { Dispatch, SetStateAction } from 'react';

import CustomCheckbox, { CheckBoxStatus } from '../CustomCheckbox';

type Props = {
  checkedRawDataKeys: string[];
  setCheckedRawDataKeys: Dispatch<SetStateAction<string[]>>;
};

export default function RawDataCheckboxes({
  checkedRawDataKeys,
  setCheckedRawDataKeys,
}: Props) {
  const rawDataInfo = [
    {
      label: '上行信息',
      value: 'upMessage',
    },
    {
      label: '下行信息',
      value: 'downMessage',
    },
    {
      label: '连接信息',
      value: 'connectMessage',
    },
  ];
  return (
    <>
      {rawDataInfo.map(({ label, value }) => {
        const checked = checkedRawDataKeys.includes(value);

        return (
          <CustomCheckbox
            key={value}
            checkboxStatus={
              checked ? CheckBoxStatus.CHECKED : CheckBoxStatus.NOT_CHECKED
            }
            onClick={() => {
              let newCheckedRawDataKeys = [];
              newCheckedRawDataKeys = checked
                ? checkedRawDataKeys.filter((key) => key !== value)
                : [...checkedRawDataKeys, value];
              setCheckedRawDataKeys(newCheckedRawDataKeys);
            }}
            styles={{
              wrapper: { marginBottom: '4px', height: '24px' },
            }}
          >
            {label}
          </CustomCheckbox>
        );
      })}
    </>
  );
}
