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
  const activeColor = isDarkMenu ? 'white' : 'primary';

  return (
    <Box
      paddingRight="18px"
      color={active ? activeColor : defaultColor}
      borderRadius="4px"
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem
        active={active}
        name={name}
        leftIcon={icon as string}
        rightIcon={
          spread ? (
            <ChevronUpFilledIcon color="grayAlternatives.300" />
          ) : (
            <ChevronDownFilledIcon color="grayAlternatives.300" />
          )
        }
      />
    </Box>
  );
}

export default ParentMenu;
