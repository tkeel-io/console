import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';
import { Menu } from '@tkeel/console-types';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

import MenuItem from './MenuItem';

type Props = Menu & {
  spread: boolean;
  handleMenuClick: (id: string) => void;
};

export default function SubMenuTitle({
  id,
  name,
  icon,
  children,
  spread,
  handleMenuClick,
}: Props) {
  const location = useLocation();
  const active: boolean = (children as Menu[]).some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  const isDarkMenu = isDarkMenuTheme();
  const defaultColor = isDarkMenu ? 'gray.400' : 'gray.600';
  const activeColor = isDarkMenu ? 'white' : 'gray.600';

  const iconActiveColor = isDarkMenu ? 'white' : 'grayAlternatives.300';
  const iconColor = active ? iconActiveColor : 'grayAlternatives.300';

  const hoverStyle = {
    color: activeColor,
    '.menu-name': {
      fontWeight: '600',
    },
    svg: {
      color: `${activeColor} !important`,
    },
    '.up-icon, .down-icon': {
      fill: `${activeColor} !important`,
    },
  };

  return (
    <Box
      paddingRight="18px"
      color={active ? activeColor : defaultColor}
      borderRadius="4px"
      _hover={hoverStyle}
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem
        active={active}
        name={name}
        leftIcon={icon as string}
        rightIcon={
          spread ? (
            <ChevronUpFilledIcon className="up-icon" color={iconColor} />
          ) : (
            <ChevronDownFilledIcon className="down-icon" color={iconColor} />
          )
        }
      />
    </Box>
  );
}
