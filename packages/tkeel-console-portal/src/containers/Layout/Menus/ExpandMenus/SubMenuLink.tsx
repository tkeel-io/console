import React from 'react';
import { Link } from '@chakra-ui/react';

import { useMenuLinkProps } from './MenuLink';

type Props = {
  path: string;
  name: string;
};

function SubMenuLink({ path, name }: Props) {
  const { as, to, active } = useMenuLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="40px"
      paddingLeft="48px"
      color={active ? 'primary' : 'gray.500'}
      as={as}
      to={to}
    >
      {name}
    </Link>
  );
}

export default SubMenuLink;
