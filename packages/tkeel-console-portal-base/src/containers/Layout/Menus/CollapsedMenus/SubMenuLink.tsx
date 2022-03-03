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

  const color = active ? 'primary' : 'gray.400';

  const hoverStyle = active
    ? {}
    : {
        color: isDarkMenu ? 'white' : 'primary',
        fontWeight: '600',
      };
  return (
    <Link
      as={ReactRouterLink}
      display="block"
      paddingLeft="16px"
      height="32px"
      lineHeight="32px"
      color={color}
      fontWeight={active ? '500' : 'normal'}
      fontSize="12px"
      borderRadius="4px"
      to={path}
      _hover={hoverStyle}
    >
      {name}
    </Link>
  );
}

export default SubMenuLink;
