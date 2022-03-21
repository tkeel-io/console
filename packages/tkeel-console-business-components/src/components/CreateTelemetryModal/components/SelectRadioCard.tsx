import { useRadioGroup, HStack } from '@chakra-ui/react';
import { RadioCard } from '@tkeel/console-components';

export interface Props {
  options: string[];
  onChange: (value: string) => void;
}

function SelectRadioCard({ options, onChange }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    // defaultValue: 'react',
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
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default SelectRadioCard;
