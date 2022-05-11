// import { Box } from '@chakra-ui/react';
import type { Props as RndProps } from 'react-rnd';
import { Rnd } from 'react-rnd';

interface Props extends RndProps {
  extras?: boolean;
}

export default function RndModal({ extras, ...rest }: Props) {
  return <Rnd {...rest} />;
}
