import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { CloseFilledIcon } from '@tkeel/console-icons';

export interface FilterConditionInfo {
  id: string;
  label: string;
  value: string;
}

type Props = {
  condition: FilterConditionInfo;
  style: StyleProps;
};

export default function FilterCondition({ condition, style }: Props) {
  const { label, value } = condition;
  return (
    <Flex
      marginRight="10px"
      flexShrink="0"
      position="relative"
      paddingLeft="4px"
      height="24px"
      borderRadius="4px"
      alignItems="center"
      fontSize="12px"
      lineHeight="24px"
      {...style}
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
        borderRadius="4px"
        backgroundColor="primary"
        opacity="0.15"
      />
      <Text color="primary" fontWeight="500">
        {label}：
      </Text>
      {value && (
        <>
          <Text margin="0 8px 0 3px" color="gray.600">
            {value}
          </Text>
          <CloseFilledIcon />
        </>
      )}
    </Flex>
  );
}
