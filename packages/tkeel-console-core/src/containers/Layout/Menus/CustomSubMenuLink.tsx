import React from 'react';
import { Link } from '@chakra-ui/react';

import { useCustomLinkProps } from './CustomMenuLink';

type Props = {
  path: string;
  name: string;
};

function CustomSubMenuLink({ path, name }: Props) {
  const { as, to, active } = useCustomLinkProps(path);
  return (
    <Link
      display="flex"
      alignItems="center"
      height="44px"
      paddingLeft="48px"
      boxShadow="none!important"
      color={active ? 'blue.300' : 'gray.500'}
      _active={{ backgroundColor: 'blue.400' }}
      as={as}
      to={to}
    >
      {name}
    </Link>
  );
}

export default CustomSubMenuLink;
