import { Flex, StyleProps } from '@chakra-ui/react';
import { useState } from 'react';

import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

interface Props {
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function DeviceSelectField({ styles }: Props) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  return (
    <Flex
      height="40px"
      position="relative"
      alignItems="flex-end"
      {...styles?.wrapper}
    >
      <Flex
        width="100%"
        paddingRight="16px"
        justifyContent="flex-end"
        alignItems="center"
        height="40px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="grayAlternatives"
        borderRadius="4px"
        cursor="pointer"
        onClick={() => setIsShowDropdown(!isShowDropdown)}
      >
        {isShowDropdown ? <ChevronUpFilledIcon /> : <ChevronDownFilledIcon />}
      </Flex>
      {isShowDropdown && (
        <Flex
          position="absolute"
          left="0"
          top="48px"
          width="100%"
          padding="16px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius="4px"
          backgroundColor="white"
        >
          下拉框
        </Flex>
      )}
    </Flex>
  );
}
