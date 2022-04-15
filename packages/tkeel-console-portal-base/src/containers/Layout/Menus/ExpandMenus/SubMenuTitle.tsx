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

function ParentMenu({
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

  const iconColor = active ? 'white' : 'grayAlternatives.300';

  const color = isDarkMenu ? 'white' : 'primary';
  const hoverStyle = {
    color,
    '.menu-name': {
      fontWeight: '600',
    },
    svg: {
      color: `${color} !important`,
    },
    '.up-icon, .down-icon': {
      fill: `${color} !important`,
    },
  };

  return (
    <Box
      paddingRight="18px"
      color={active ? 'white' : defaultColor}
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

export default ParentMenu;
