import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';

import { Menu } from '@/tkeel-console-portal/hooks/queries/useMenusQuery';

type Props = {
  data: Menu[];
};

function SubMenuLinks({ data }: Props) {
  return (
    <Box
      position="absolute"
      left="56px"
      top="0"
      zIndex="1"
      padding="4px 0"
      width="144px"
      borderRadius="4px"
      backgroundColor="gray.800"
    >
      {data.map((menu) => (
        <Link
          as={ReactRouterLink}
          key={menu.id}
          display="block"
          paddingLeft="16px"
          height="32px"
          lineHeight="32px"
          color="white"
          fontSize="12px"
          to={menu.path as string}
          _hover={{ backgroundColor: 'gray.700' }}
        >
          {menu.name}
        </Link>
      ))}
    </Box>
  );
}

export default SubMenuLinks;
