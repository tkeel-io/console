import { Box, Flex, Text, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { SuccessFilledIcon } from '@tkeel/console-icons';

interface PropsType extends UseRadioProps {
  label: string;
  icon: ReactNode;
}
export default function RadioCard(props: PropsType) {
  const { isDisabled, label, icon, isChecked } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
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
          bg: 'brand.50',
          color: 'gray.600',
          borderColor: 'primary',
        }}
      >
        <Flex alignItems="center">
          {icon}
          <Text color={isChecked ? 'primary' : 'gray.600'}>{label}</Text>
        </Flex>
        {isChecked && <SuccessFilledIcon color="primary" size={18} />}
      </Flex>
    </Box>
  );
}
