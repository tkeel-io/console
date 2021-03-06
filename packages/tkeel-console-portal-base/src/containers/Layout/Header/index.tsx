import { Center, Flex, Text, useOutsideClick } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useColors } from '@tkeel/console-hooks';
import { BellFilledIcon, BellTipsTwoToneIcon } from '@tkeel/console-icons';
import { Menu } from '@tkeel/console-types';

import useNotificationsQuery from '@/tkeel-console-portal-base/hooks/queries/useNotificationsQuery';

import NotificationsPanel from './NotificationsPanel';

type Props = {
  menus: Menu[];
  userActionMenusComponent: ReactNode;
};

export default function Header({ menus, userActionMenusComponent }: Props) {
  const { pathname } = useLocation();
  let breadcrumbs: string[] = [];

  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const { notifications } = useNotificationsQuery();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref,
    handler: () => setIsShowNotifications(false),
  });

  const colors = useColors();

  menus.forEach((menu) => {
    const { name, path, children } = menu;
    if (Array.isArray(children) && children.length > 0) {
      const menuItem = children.find((item) =>
        pathname.includes(item.path as string)
      );
      if (menuItem) {
        breadcrumbs = [name, menuItem.name];
      }
    } else if (pathname.includes(path as string)) {
      breadcrumbs = [name];
    }
  });

  const textStyle = {
    color: 'grayAlternatives.500',
    fontSize: '12px',
    fontWeight: '500',
  };

  const iconColor = isShowNotifications ? 'primary' : 'grayAlternatives.300';

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height="48px"
      padding="0 20px"
    >
      <Flex>
        {breadcrumbs.map((crumb, i) => (
          <Flex key={String(i + 1)} alignItems="center">
            <Text key="crumb" {...textStyle}>
              {crumb}
            </Text>
            {i < breadcrumbs.length - 1 && (
              <Text margin="0" {...textStyle}>
                /
              </Text>
            )}
          </Flex>
        ))}
      </Flex>
      <Flex alignItems="center">
        <Center
          ref={ref}
          marginRight="12px"
          position="relative"
          width="24px"
          height="24px"
          borderRadius="50%"
          cursor="pointer"
          backgroundColor={isShowNotifications ? 'brand.50' : 'transparent'}
          _hover={{
            backgroundColor: 'brand.50',
            '& > svg': {
              fill: `${colors.primary} !important`,
            },
          }}
          onClick={() => setIsShowNotifications(!isShowNotifications)}
        >
          {notifications.length > 0 ? (
            <BellTipsTwoToneIcon color={iconColor} twoToneColor="red.300" />
          ) : (
            <BellFilledIcon color={iconColor} />
          )}
          {isShowNotifications && (
            <NotificationsPanel
              notifications={notifications}
              sx={{
                position: 'absolute',
                zIndex: 10,
                left: '-272px',
                top: '28px',
              }}
            />
          )}
        </Center>
        {userActionMenusComponent}
      </Flex>
    </Flex>
  );
}
