import { Dispatch, SetStateAction } from 'react';

import CustomCheckbox, { CheckboxStatus } from '../CustomCheckbox';

export type CheckBoxItem = {
  label: string;
  value: string;
};

type Props = {
  rawDataCheckboxItems: CheckBoxItem[];
  rawDataCheckedKeys: string[];
  setRawDataCheckedKeys: Dispatch<SetStateAction<string[]>>;
};

export default function RawDataCheckboxes({
  rawDataCheckboxItems,
  rawDataCheckedKeys,
  setRawDataCheckedKeys,
}: Props) {
  return (
    <>
      {rawDataCheckboxItems.map(({ label, value }) => {
        const checked = rawDataCheckedKeys.includes(value);

        return (
          <CustomCheckbox
            key={value}
            checkboxStatus={
              checked ? CheckboxStatus.CHECKED : CheckboxStatus.NOT_CHECKED
            }
            onClick={() => {
              let newCheckedRawDataKeys = [];
              newCheckedRawDataKeys = checked
                ? rawDataCheckedKeys.filter((key) => key !== value)
                : [...rawDataCheckedKeys, value];
              setRawDataCheckedKeys(newCheckedRawDataKeys);
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
