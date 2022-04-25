import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import iconCheckbox from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox.svg';
import iconCheckboxChecked from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-checked.svg';
import iconCheckboxIndeterminate from '@/tkeel-console-plugin-tenant-data-query/assets/images/checkbox-indeterminate.svg';

export enum CheckboxStatus {
  NOT_CHECKED = 'not-checked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate',
}

type Props = {
  checkboxStatus?: CheckboxStatus;
  onClick?: () => unknown;
  children?: string;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function CustomCheckbox({
  checkboxStatus = CheckboxStatus.NOT_CHECKED,
  onClick,
  children,
  styles,
}: Props) {
  let checkboxImage = iconCheckbox;
  const checkboxBackgroundSize =
    checkboxStatus === CheckboxStatus.NOT_CHECKED ? '12px 12px' : '16px 16px';

  if (checkboxStatus === CheckboxStatus.CHECKED) {
    checkboxImage = iconCheckboxChecked;
  } else if (checkboxStatus === CheckboxStatus.INDETERMINATE) {
    checkboxImage = iconCheckboxIndeterminate;
  }
  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      {...styles?.wrapper}
      onClick={onClick}
    >
      <Box
        width="12px"
        height="12px"
        backgroundImage={`url(${checkboxImage})`}
        backgroundPosition="center"
        backgroundSize={checkboxBackgroundSize}
      />
      <Text marginLeft="8px" color="gray.700" fontSize="12px">
        {children}
      </Text>
    </Flex>
  );
}
