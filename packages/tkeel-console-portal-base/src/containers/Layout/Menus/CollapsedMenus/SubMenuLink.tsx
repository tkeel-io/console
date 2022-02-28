import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useActive } from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuLink';

type Props = {
  path: string;
  name: string;
  isDarkMenu: boolean;
};

function SubMenuLink({ path, name, isDarkMenu }: Props) {
  const active = useActive(path);
  // let color = active ? '';
  // if (isDarkMenu) {
  //   color = active ? 'white' : 'gray.400';
  // }
  const defaultColor = active ? 'gray.600' : 'gray.400';
  const color = active ? 'white' : defaultColor;

  const hoverStyle = active
    ? {}
    : {
        color: isDarkMenu ? 'white' : 'primary',
        backgroundColor: isDarkMenu ? 'gray.700' : 'gray.100',
      };
  return (
    <Link
      as={ReactRouterLink}
      display="block"
      paddingLeft="16px"
      height="32px"
      lineHeight="32px"
      color={color}
      fontSize="12px"
      borderRadius="4px"
      to={path}
      backgroundColor={active ? 'primary' : 'transparent'}
      _hover={hoverStyle}
    >
      {name}
    </Link>
  );
}

export default SubMenuLink;
