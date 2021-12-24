import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

import MenuItem from './MenuItem';

import { IMenu } from '@/mock/types';

type Props = IMenu & {
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
  const active: boolean = (children as IMenu[]).some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  const mode = active ? 'dark' : 'light';
  return (
    <Box
      paddingRight="18px"
      color={active ? 'white' : 'gray.600'}
      backgroundColor={active ? 'grayAlternatives.700' : 'inherit'}
      borderRadius="4px"
      active={active.toString()}
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem
        active={active}
        name={name}
        leftIcon={icon as string}
        rightIcon={
          spread ? (
            <ChevronUpFilledIcon mode={mode} />
          ) : (
            <ChevronDownFilledIcon mode={mode} />
          )
        }
      />
    </Box>
  );
}

export default ParentMenu;
