import { Box } from '@chakra-ui/react';

import iconCheckbox from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox.svg';
import iconCheckboxChecked from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-checked.svg';
import iconCheckboxIndeterminate from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-indeterminate.svg';

export enum CheckBoxStatus {
  NOT_CHECKED = 'not-checked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate',
}

type Props = {
  checkboxStatus?: CheckBoxStatus;
  onClick?: () => unknown;
};

export default function CustomCheckbox({
  checkboxStatus = CheckBoxStatus.NOT_CHECKED,
  onClick,
}: Props) {
  let checkboxImage = iconCheckbox;
  const checkboxBackgroundSize =
    checkboxStatus === CheckBoxStatus.NOT_CHECKED ? '12px 12px' : '16px 16px';

  if (checkboxStatus === CheckBoxStatus.CHECKED) {
    checkboxImage = iconCheckboxChecked;
  } else if (checkboxStatus === CheckBoxStatus.INDETERMINATE) {
    checkboxImage = iconCheckboxIndeterminate;
  }
  return (
    <Box
      width="12px"
      height="12px"
      backgroundImage={`url(${checkboxImage})`}
      backgroundPosition="center"
      backgroundSize={checkboxBackgroundSize}
      onClick={onClick}
    />
  );
}
