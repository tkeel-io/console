import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { Menu } from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

import MenuItem from './MenuItem';
import SubMenuLinks from './SubMenuLinks';

type Props = {
  icon: string;
  subMenus: Menu[];
};

function SubMenus({ icon, subMenus }: Props) {
  const location = useLocation();
  const active: boolean = subMenus.some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  const [showSubMenus, setShowSubMenus] = useState(false);
  let timer: number | null = null;

  const handleMouseEnter = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    setShowSubMenus(true);
  };

  const handleMouseLeave = () => {
    timer = window.setTimeout(() => {
      setShowSubMenus(false);
    }, 200);
  };

  return (
    <Box
      position="relative"
      marginTop="10px"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuItem icon={icon} active={active} />
      {showSubMenus && <SubMenuLinks data={subMenus} />}
    </Box>
  );
}

export default SubMenus;
