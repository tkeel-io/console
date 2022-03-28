import {
  Box,
  Flex,
  Text,
  Tooltip,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { SuccessFilledIcon } from '@tkeel/console-icons';

interface PropsType extends UseRadioProps {
  label: string;
  icon: ReactNode;
}
export default function RadioCard(props: PropsType) {
  const { label, icon, value, isChecked } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Tooltip // 二期删掉
      label={value === 'time' ? '敬请期待' : ''}
      placement="top"
      hasArrow
      bgColor="white"
      color="gray.700"
      lineHeight="24px"
      fontSize="12px"
      p="4px 8px"
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2);"
    >
      <Box as="label">
        <input {...input} />
        <Flex
          {...checkbox}
          alignItems="center"
          justifyContent="space-between"
          borderWidth="1px"
          w="200px"
          h="44px"
          padding="10px 22px"
          bg="white"
          borderColor="gray.200"
          borderRadius="4px"
          _checked={{
            bg: 'primarySub',
            color: 'gray.600',
            borderColor: 'green.300',
          }}
        >
          <Flex alignItems="center">
            {icon}
            {/* <Text color={isChecked ? 'green.300' : 'gray.600'}>{label}</Text> //二期替换 */}
            <Text color={isChecked ? 'green.300' : 'gray.400'}>{label}</Text>
          </Flex>
          {isChecked && <SuccessFilledIcon color="green.300" size={18} />}
        </Flex>
      </Box>
    </Tooltip>
  );
}
