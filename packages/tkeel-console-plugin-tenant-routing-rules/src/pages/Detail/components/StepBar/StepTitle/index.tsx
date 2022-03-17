import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import IconCircle from '../IconCircle';

type Props = {
  icon: ReactNode;
  title: string;
  active: boolean;
};

export default function StepTitle({ icon, title, active }: Props) {
  return (
    <Flex alignItems="center">
      <IconCircle active={active}>{icon}</IconCircle>
      <Text marginLeft="8px" color="white" fontSize="12px" lineHeight="24px">
        {title}
      </Text>
    </Flex>
  );
}
