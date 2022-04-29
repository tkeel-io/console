import { HStack, useRadioGroup } from '@chakra-ui/react';

import { RadioCard } from '@tkeel/console-components';

export interface Props {
  options: string[];
  onChange: (value: string) => void;
  defaultValue: string;
}

function SelectRadioCard({ options, onChange, defaultValue }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue,
    onChange: (value) => {
      onChange(value);
    },
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            style={{ width: 'auto', height: '28px', padding: '0 20px' }}
            {...radio}
          >
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default SelectRadioCard;
