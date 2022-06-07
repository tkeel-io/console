import { Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

interface Props {
  options: {
    label: ReactNode;
    value: string;
  }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function RadioButton({
  options,
  value,
  defaultValue,
  onChange,
}: Props) {
  const defaultValueState = defaultValue || options[0]?.value;
  const [valueState, setValueState] = useState(defaultValueState);
  const newValue = value || valueState;

  return (
    <Flex>
      {options.map(({ label, value: optionValue }, index) => {
        const selected = newValue === optionValue;
        const selectedIndex = options.findIndex(
          (option) => option.value === newValue
        );
        const borderColor = selected ? 'primary' : 'grayAlternatives.100';
        const borderRightColor =
          index === selectedIndex - 1 ? 'transparent' : borderColor;

        return (
          <Flex
            key={optionValue}
            alignItems="center"
            height="36px"
            paddingX="10px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={borderColor}
            borderRightColor={borderRightColor}
            color={selected ? 'primary' : 'gray.500'}
            fontSize="14px"
            fontWeight={selected ? '600' : '400'}
            cursor="pointer"
            backgroundColor={selected ? 'brand.50' : 'white'}
            _notFirst={{
              borderLeftColor: selected ? 'primary' : 'transparent',
            }}
            _first={{
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
            }}
            _last={{
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
            }}
            onClick={() => {
              setValueState(optionValue);
              if (onChange) {
                onChange(optionValue);
              }
            }}
          >
            {label}
          </Flex>
        );
      })}
    </Flex>
  );
}
