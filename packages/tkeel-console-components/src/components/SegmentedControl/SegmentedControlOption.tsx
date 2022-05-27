import type { StyleProps, UseRadioProps } from '@chakra-ui/react';
import { Center, chakra, useRadio } from '@chakra-ui/react';
import { ReactNode } from 'react';

import * as styles from './styles';

interface Props extends UseRadioProps {
  label: ReactNode;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    label?: StyleProps;
    labelActive?: StyleProps;
    labelDisabled?: StyleProps;
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
    <chakra.label
      {...htmlProps}
      flex="1"
      cursor="pointer"
      {...customStyles?.root}
      {...sx}
    >
      <input {...inputProps} hidden />
      <Center
        {...getCheckboxProps()}
        {...styles.label}
        {...customStyles?.label}
        _checked={{ ...styles.labelActive, ...customStyles?.labelActive }}
        _disabled={{ ...styles.labelDisabled, ...customStyles?.labelDisabled }}
      >
        {label}
      </Center>
    </chakra.label>
  );
}
