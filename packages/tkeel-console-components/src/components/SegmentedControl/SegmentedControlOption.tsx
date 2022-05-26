import type { StyleProps, UseRadioProps } from '@chakra-ui/react';
import { Center, chakra, useRadio } from '@chakra-ui/react';
import { ReactNode } from 'react';

import * as styles from './styles';

interface Props extends UseRadioProps {
  label: ReactNode;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    active?: StyleProps;
    disabled?: StyleProps;
  };
}

export type { Props };

export default function Radio({
  label,
  sx,
  styles: customStyles,
  ...radioProps
}: Props) {
  const res = useRadio(radioProps);
  const { getInputProps, getCheckboxProps, htmlProps } = res;
  const inputProps = getInputProps({});

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...inputProps} hidden />
      <Center
        {...getCheckboxProps()}
        {...styles.label}
        {...customStyles?.root}
        {...sx}
        _checked={{ ...styles.labelActive, ...customStyles?.active }}
        _disabled={{ ...styles.labelDisabled, ...customStyles?.disabled }}
      >
        {label}
      </Center>
    </chakra.label>
  );
}
