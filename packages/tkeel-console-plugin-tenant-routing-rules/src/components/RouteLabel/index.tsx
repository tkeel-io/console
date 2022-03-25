import { Flex, SpinnerProps, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { RoutesMsgIcon, RoutesTimeIcon } from '@tkeel/console-icons';

interface Props extends SpinnerProps {
  routeType: string;
  styles?: {
    wrapper?: StyleProps;
  };
}

type RouteItem = { name: string; color: string; icon: ReactNode };

type RouteTypeInfo = {
  time: RouteItem;
  msg: RouteItem;
};

function RouteLabel({ styles, routeType }: Props) {
  const attribute = {
    size: '16px',
    twoToneColor: 'whiteAlpha.600',
    color: 'white',
    style: { marginRight: '4px' },
  };

  const routeTypeInfo: RouteTypeInfo = {
    time: {
      name: '时序路由',
      color: 'orange.300',
      icon: <RoutesTimeIcon {...attribute} />,
    },
    msg: {
      name: '消息路由',
      color: 'blue.300',
      icon: <RoutesMsgIcon {...attribute} />,
    },
  };

  const item = routeTypeInfo[routeType] as RouteItem;

  return (
    <Flex
      w="84px"
      h="24px"
      alignItems="center"
      justifyContent="center"
      bg={item.color}
      borderRadius="2px"
      {...styles?.wrapper}
    >
      {item.icon}
      <Text fontSize="12px" color="white" ml="4px">
        {item.name}
      </Text>
    </Flex>
  );
}

export default RouteLabel;
